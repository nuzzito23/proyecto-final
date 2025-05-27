const overlay = document.createElement("div");
overlay.className = "modal-overlay";
const modal = document.getElementById("editModal"); 
document.body.appendChild(overlay);

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById(".menu-icon");
  const menuOptions = document.getElementById("admin-menu-options");
  const salesHistoryButton = document.getElementById("view-sales-history");
  const salesHistorySection = document.getElementById("sales-history");
  const cerrarSesionButton = document.getElementById("cerrar-sesion");

  // Toggle menu visibility
  menuIcon.addEventListener("click", () => {
    menuOptions.style.display = menuOptions.style.display === "block"
      ? "none"
      : "block";
  });

  // muestra el historial de ventas al hacer clic en el botón
  salesHistoryButton.addEventListener("click", () => {
    salesHistorySection.style.display = "block";
    salesHistorySection.innerHTML = `
            <h2>Historial de Ventas</h2>
            
        `;
  });
});
// Función para mostrar el modal de edición
let currentPage = 0;
const itemsPerPage = 5; 
async function fetchCatalogo() {
  try {
    const token = localStorage.getItem("authToken"); 
    const response = await fetch("http://localhost:3000/api/products/list", {
      headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
      }
    }); 
    const data = await response.json();

    
    const catalogoContainer = document.getElementById("catalogo-items");
    catalogoContainer.innerHTML = ""; // Clear the container
    const currentItems = data.data;

    // renderizando los elementos del catalogo
    currentItems.forEach((item) => {
      const catalogItem = document.createElement("div");
      catalogItem.className = "item-catalogo";
      catalogItem.innerHTML = `
            <div class="item-image">
            <img class="modelos" src="${item.image}" alt="Imagen">
            </div>
            <div id="${item._id}" class="item-info">  
              <h3>${item.name}</h3>
              <p>Precio: $${item.price}</p>
              <p>Stock: ${item.stock}</p>
            </div>
            <div class="buttons-container">
              <button onclick="deleteProduct('${item._id}')" class="delete-btn">Eliminar</button>
              <button onclick="openModal('${item._id}')" class="edit-btn">Editar</button>
            </div>
        `;
      catalogoContainer.appendChild(catalogItem);
    });  
  } catch (error) {
    console.error("Error fetching catalog:", error);
  }
}

fetchCatalogo();

const cerrarSesionButton = document.getElementById("cerrar-sesion");
cerrarSesionButton.addEventListener("click", () => {
  localStorage.removeItem("authToken"); // Elimina el token del almacenamiento local
  window.location.href = "./login.html"; // redirecciona a la página de inicio de sesión
  logout(); // Llama a la función de cierre de sesión
});
function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
}

// Cierrar el modal al hacer clic en el overlay
overlay.addEventListener("click", closeModal);

async function openModal(productId) {
  document.getElementById("editModal").style.display = "block";
  overlay.style.display = "block";
  await fetchProductDetails(productId);
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
  document.getElementById("create-product-modal").style.display = "none"
  overlay.style.display = "none";
}

// para cuando se vaya a editar algun producto
async function saveChanges() {
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = document.getElementById("productPrice").value;
  const stock = document.getElementById("productStock").value;
  const productId = document.getElementById("productId").value; 
  const productData = {
    name,
    description,
    price,
    stock,
  };
  await fetchProductUpdate(productId);

  alert(`Producto actualizado: ${name}, Precio: ${price}`);
  closeModal();
}

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    closeModal();
  }
});

// desplegar el menu hamburguesa
function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}

async function deleteProduct(productId) {
  // Muestra una confirmación antes de eliminar el producto
  const confirmation = confirm(
    "¿Estás seguro de que deseas eliminar este producto?",
  );
  if (!confirmation) {
    return; // Sale si el usuario cancela
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    );

    if (response.ok) {
      await fetchCatalogo(); // Actualiza el catálogo después de la eliminación
      alert("Producto eliminado exitosamente");
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

// trae llenos los campos con lo que ya tenian para luego editar los productos
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    );
    const data = await response.json();
    console.log(response.ok, data.data.name);
    if (response.ok) {
      document.getElementById("productName").value = data.data.name;
      document.getElementById("productPrice").value = data.data.price;
      document.getElementById("productDescription").value =
        data.data.description;
      document.getElementById("productStock").value = data.data.stock;
      document.getElementById("productId").value = data.data._id; 
    } else {
      alert("Error al obtener los detalles del producto");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// esto guarda los cambios de un producto en la bd
async function fetchProductUpdate(productId, ProductData) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(ProductData),
      },
    );
    const data = await response.json();
    if (response.ok) {
      document.getElementById("productName").value = data.data.name;
      document.getElementById("productPrice").value = data.data.price;
      document.getElementById("productDescription").value =
        data.data.description;
      document.getElementById("productStock").value = data.data.stock;
    } else {
      alert("Error al obtener los detalles del producto");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

//crear un nuevo producto
function openProductModal() {
  document.getElementById("create-product-modal").style.display = "block";
  overlay.style.display = "block";
}

document.getElementById("product-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("stock", document.getElementById("stock").value);
  formData.append("image", document.getElementById("image").files[0]);

  try {
    const response = await fetch("http://localhost:3000/api/products/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Producto agregado exitosamente!");
      document.getElementById("product-form").reset();
      fetchCatalogo(); // Refresh the catalog after adding a new product
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
});