function checkAuth() {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
        window.location.href = "/home.html"; // Change to your login page
    }
}

// Call this function on page load to enforce authentication
checkAuth();

const carrito = [];

        document.querySelectorAll('.add').forEach((button, index) => {
            button.addEventListener('click', () => {
                const item = document.querySelectorAll('.item-catalogo')[index];
                const productoNombre = item.querySelector('h3').textContent;
                carrito.push(productoNombre);
                alert(`${productoNombre} agregado al carrito.`);
                console.log('Carrito:', carrito);
            });
        });
        let cartCount = 0;

        document.querySelectorAll('.add').forEach((button) => {
            button.addEventListener('click', () => {
                cartCount++;
                document.getElementById('cart-count').textContent = cartCount;
            });
        });
    
        const cart = [];
        const cartCountElement = document.getElementById('cart-count');
        const cartItemsElement = document.getElementById('cart-items');

        document.querySelectorAll('.add').forEach((button) => {
            button.addEventListener('click', () => {
                const item = button.parentElement;
                const productoNombre = item.querySelector('h3').textContent;
                const productoImagen = item.querySelector('img').src;
                const productoPrecio = parseFloat(productoNombre.match(/\d+/)[0]); //Extrayendo el precio del nombre del producto

                cart.push({ name: productoNombre, image: productoImagen, price: productoPrecio });
                cartCountElement.textContent = cart.length;

                //Actualzando la visuaizacion de articulos del carrito
                const total = cart.reduce((sum, product) => sum + product.price, 0);
                cartItemsElement.innerHTML = cart.map(product => `
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                        <div>
                            <p style="margin: 0;">${product.name}</p>
                            <p style="margin: 0;">Precio: $${product.price}</p>
                        </div>
                    </div>
                `).join('') + `<p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${total.toFixed(2)}</p>`;
            });
        });

        //Mostrar los articulos del carrito al pasar el cursor
        const cartCounter = document.querySelector('.cart-counter');
        cartCounter.addEventListener('mouseenter', () => {
            if (cart.length === 0) {
                cartItemsElement.innerHTML = '<p>Carrito vacío</p>';
            }
            cartItemsElement.style.display = 'block';
        });

        cartCounter.addEventListener('mouseleave', () => {
            cartItemsElement.style.display = 'none';
        });

        // Function to fetch data from the backend
async function fetchCatalogo() {
    try {
      const response = await fetch('http://localhost:3000/api/products/list'); // Adjust the URL as needed
      const data = await response.json();

      // Assume `data` is an array of catalog items
      const catalogoContainer = document.getElementById('catalogo-container');
      catalogoContainer.innerHTML = ''; // Clear the container
      
      data.data.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'item-catalogo';
        catalogItem.innerHTML = `
          <img class="modelos" src="${item.image}" alt="Imagen">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button class="add">Agregar al carrito</button>
        `;
        catalogoContainer.appendChild(catalogItem);
      });
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  }

  // Call the function on page load
  fetchCatalogo();

  document.getElementById('catalogo-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('add')) {
        const item = event.target.parentElement;
        const productoNombre = item.querySelector('h3').textContent;
        const productoImagen = item.querySelector('img').src;
        const productoPrecio = parseFloat(productoNombre.match(/\d+/)[0]);

        cart.push({ name: productoNombre, image: productoImagen, price: productoPrecio });
        cartCountElement.textContent = cart.length;

        // Updating cart visualization
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        cartItemsElement.innerHTML = cart.map(product => `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <p style="margin: 0;">${product.name}</p>
                    <p style="margin: 0;">Precio: $${product.price}</p>
                </div>
            </div>
        `).join('') + `<p style="font-weight: bold; margin-top: 10px;">Total a pagar: $${total.toFixed(2)}</p>;`

        alert(`${productoNombre} agregado al carrito.`);
        console.log('Carrito:', cart);
    }
});

const cerrarSesionButton = document.getElementById('cerrar-sesion');
cerrarSesionButton.addEventListener('click', () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    window.location.href = './login.html'; // Redirect to login page
    logout(); // Call the logout function
});
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
}
