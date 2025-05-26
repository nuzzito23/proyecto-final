let cartCount = 0;
const cart = [];
const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
function checkAuth() {
    const token = localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
    if (!token) {
        window.location.href = "/html/home.html"; // Change to your login page
    }
}

// Call this function on page load to enforce authentication
checkAuth();

const carrito = [];

// Function to fetch data from the backend
async function fetchCatalogo() {
    try {
        const response = await fetch(
            "http://localhost:3000/api/products/list",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${
                        localStorage.getItem("authToken")
                    }`,
                },
            },
        ); // Adjust the URL as needed
        const data = await response.json();

        // Assume data is an array of catalog items
        const catalogoContainer = document.getElementById("catalogo-items");
        catalogoContainer.innerHTML = ""; // Clear the container
        const currentItems = data.data;

        currentItems.forEach((item) => {
            const catalogItem = document.createElement("div");
            catalogItem.className = "item-catalogo";
            catalogItem.innerHTML = `
            <div class="item-image">
                <img class="modelos" src="${item.image}" alt="Imagen">
            </div>
            <div id="${item._id}" class="item-info">  
              <h3 class="item-name">${item.name}</h3>
              <p class="price-unit">Precio: $${item.price}</p>
              <p>Stock: ${
                item.stock !== undefined ? item.stock : "no disponible"
            }</p>
            </div>
            <div class="buttons-container">
                <button class="add">Agregar al carrito</button>
            </div>
        `;
            catalogoContainer.appendChild(catalogItem);
        });
    } catch (error) {
        console.error("Error fetching catalog:", error);
    }
}

// Call the function on page load
fetchCatalogo();

document.getElementById("catalogo-items").addEventListener("click", (event) => {
    if (event.target.classList.contains("add")) {
        const item = event.target.closest(".item-catalogo");
        const productoNombre = item.querySelector(".item-name").textContent;
        const productoImagen = item.querySelector("img").src;
        const productoPrecio = parseFloat(
            item.querySelector(".price-unit").textContent.split("$")[1],
        );
        const productoId = item.querySelector(".item-info").id;

        cart.push({
            name: productoNombre,
            image: productoImagen,
            price: productoPrecio,
            cantidad: 1,
            productId: productoId,
        });
        cartCountElement.textContent = cart.length;

        actualizarCarrito();

    alert(`${productoNombre} agregado al carrito.`);
        console.log("Carrito:", cart);
    }
});

// function actualizarCarrito() {
//     const total = cart.reduce((sum, product) => sum + product.price, 0);
//     cartItemsElement.innerHTML = cart.length
//         ? cart.map((product) => `
//             <div style="display: flex; align-items: center; margin-bottom: 10px;">
//                 <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
//                 <div>
//                     <p style="margin: 0;">${product.name}</p>
//                     <p style="margin: 0;">Precio: $${product.price}</p>
//                 </div>
//             </div>
//         `).join("") +
//             `<p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${
//                 total.toFixed(2)
//             }</p>`
//         : "<p>Carrito vacío</p>";

//     // Mostrar el carrito cuando hay productos
//     // cartItemsElement.style.display = cart.length ? "block" : "none";
//     // paypalButtonContainer.style.display = cart.length ? "block" : "none"
// }

document.querySelector(".shopping-icon").addEventListener("click", () => {
    const cartItemsElement = document.getElementById("cart-items");
    const paypalButtonContainer = document.getElementById("paypal-button-container");

    // Alternar visibilidad
    cartItemsElement.style.display = cartItemsElement.style.display === "block" ? "none" : "block";
    paypalButtonContainer.style.display = paypalButtonContainer.style.display === "block" ? "none" : "block";
});


function actualizarCarrito() {
    const paypalButtonContainer = document.getElementById("paypal-button-container");
    const total = cart.reduce((sum, product) => sum + product.price, 0);

    cartItemsElement.innerHTML = cart.length
        ? cart.map((product, index) => `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <p style="margin: 0;">${product.name}</p>
                    <p style="margin: 0;">Precio: $${product.price}</p>
                </div>
                <button class="remove" data-index="${index}">Eliminar</button>
            </div>
        `).join("") + `
            <p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${
                total.toFixed(2)
            }</p>
        `
        : "<p>Carrito vacío</p>";

    // Mostrar u ocultar el botón de PayPal
    paypalButtonContainer.style.display = cart.length ? "block" : "none";

    // Agregar event listener para los botones de eliminar
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            cartCountElement.textContent = cart.length;
            actualizarCarrito(); // Refrescar la vista del carrito
        });
    });

    // Renderizar el botón de PayPal solo si el carrito no está vacío
    if (cart.length && !paypalButtonContainer.hasChildNodes()) {
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: total.toFixed(2) } }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    document.getElementById("result-message").textContent = "Pago completado: " + details.id;
                });
            }
        }).render("#paypal-button-container");
    }
}


// document.querySelectorAll(".add").forEach((button) => {
//     button.addEventListener("click", () => {
//         const item = button.parentElement;
//         const productoNombre = item.querySelector("h3").textContent;
//         const productoImagen = item.querySelector("img").src;
//         const productoPrecio = parseFloat(
//             item.querySelector(".price-unit").textContent.split("$")[1],
//         );

//         cart.push({
//             name: productoNombre,
//             image: productoImagen,
//             price: productoPrecio,
//         });
//         cartCountElement.textContent = cart.length;

//         //Actualzando la visuaizacion de articulos del carrito
//         const total = cart.reduce((sum, product) => sum + product.price, 0);
//         cartItemsElement.innerHTML = cart.map((product) => `
//             <div style="display: flex; align-items: center; margin-bottom: 10px;">
//                 <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
//                 <div>
//                     <p style="margin: 0;">${product.name}</p>
//                     <p style="margin: 0;">Precio: $${product.price}</p>
//                 </div>
//             </div>
//         `).join("") +
//             `<p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${
//                 total.toFixed(2)
//             }</p>`;
//     });
// });

//Mostrar los articulos del carrito al pasar el cursor
document.querySelector(".cart-counter").addEventListener("mouseenter", () => {
    cartItemsElement.style.display = cart.length ? "block" : "none";
});

// Call the function on page load
fetchCatalogo();

// document.getElementById("catalogo-container").addEventListener(
//     "click",
//     (event) => {
//         if (event.target.classList.contains("add")) {
//             const item = event.target.parentElement;
//             const productoNombre = item.querySelector("h3").textContent;
//             const productoImagen = item.querySelector("img").src;
//             const productoPrecio = parseFloat(
//                 item.querySelector(".price-unit").textContent.split("$")[1],
//             );

//             cart.push({
//                 name: productoNombre,
//                 image: productoImagen,
//                 price: productoPrecio,
//             });
//             cartCountElement.textContent = cart.length;

//             // Updating cart visualization
//             const total = cart.reduce((sum, product) => sum + product.price, 0);
//             cartItemsElement.innerHTML = cart.map((product) => `
//             <div style="display: flex; align-items: center; margin-bottom: 10px;">
//                 <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
//                 <div>
//                     <p style="margin: 0;">${product.name}</p>
//                     <p style="margin: 0;">Precio: $${product.price}</p>
                    
//                 </div>
//             </div>
//         `).join("") +
//                 `<p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${
//                     total.toFixed(2)
//                 }</p>;
//         <button>Pagar</button>`;

//             alert(${productoNombre} agregado al carrito.);
//             console.log("Carrito:", cart);
//         }
//     },
// );

document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    window.location.href = "./login.html"; // Redirect to login page
    logout(); // Call the logout function
});

function toggleMenu() {
    document.querySelector(".nav-menu").classList.toggle("active");
}

const paypalButtons = window.paypal.Buttons({
   style: {
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    },
   message: {
        amount: cart.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2),
    },
   async createOrder() {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${
                        localStorage.getItem("authToken")
                    }`,
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                    cart: cart.map((product) => ({
                        id: product.productId, // ID del producto
                        name: product.name, // Nombre del producto
                        quantity: product.quantity, // Ajusta según lógica de cantidad
                        price: product.price.toFixed(2), // Precio correcto con dos decimales
                    })),
                    total_price: cart.reduce(
                        (sum, product) =>
                            sum + Number(product.price) ,
                        0,
                    ),
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            }
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
                `? ${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                 JSON.stringify(orderData);

            throw new Error(errorMessage);
        } catch (error) {
            console.error(error);
            // resultMessage(Could not initiate PayPal Checkout...<br><br>${error});
        }
    },
   async onApprove(data, actions) {
        try {
            const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per
                // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                );
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments
                        ?.authorizations?.[0];
                resultMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
                );
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );
            }
        } catch (error) {
            console.error(error);
            resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
            );
        }
    },

   
});
paypalButtons.render("#paypal-button-container");


// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}