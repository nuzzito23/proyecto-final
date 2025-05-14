const overlay = document.createElement("div");
overlay.className = "modal-overlay";
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

  // Show sales history
  salesHistoryButton.addEventListener("click", () => {
    salesHistorySection.style.display = "block";
    salesHistorySection.innerHTML = `
            <h2>Historial de Ventas</h2>
            
        `;
  });
});
// Function to fetch data from the backend
let currentPage = 0;
const itemsPerPage = 5; 
async function fetchCatalogo() {
  try {
    const response = await fetch("http://localhost:3000/api/products/list"); // Adjust the URL as needed
    const data = await response.json();

    // Assume data is an array of catalog items
    const catalogoContainer = document.getElementById("catalogo-items");
    // const paginationContainer = document.getElementById("pagination-controls"); 
    catalogoContainer.innerHTML = ""; // Clear the container
    // paginationContainer.innerHTML = "";

    // Calculate start and end index
    // const startIndex = currentPage * itemsPerPage;
    // let endIndex = startIndex + itemsPerPage;

    // // If we reach the end, loop back to start
    // if (startIndex >= data.data.length) {
    //   currentPage = 0;
    //   endIndex = itemsPerPage;
    // }

    // Slice data for the current page
    // const currentItems = data.data.slice(startIndex, endIndex);
    const currentItems = data.data;

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

    // const prevButton = document.querySelector("button");
    // prevButton.textContent = "←";
    // prevButton.onclick = () => {
    //   currentPage = (currentPage === 0) ? Math.ceil(data.data.length / itemsPerPage) - 1 : currentPage - 1;
    //   fetchCatalogo();
    // };

    // const nextButton = document.createElement("button");
    // nextButton.textContent = "→";
    // nextButton.onclick = () => {
    //   currentPage++;
    //   fetchCatalogo();
    // };

    // paginationContainer.appendChild(prevButton);
    // paginationContainer.appendChild(nextButton);
  
  } catch (error) {
    console.error("Error fetching catalog:", error);
  }
}

// Call the function on page load
fetchCatalogo();

const cerrarSesionButton = document.getElementById("cerrar-sesion");
cerrarSesionButton.addEventListener("click", () => {
  localStorage.removeItem("authToken"); // Remove token from local storage
  window.location.href = "./login.html"; // Redirect to login page
  logout(); // Call the logout function
});
function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
}

// Close modal when clicking outside
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

async function saveChanges() {
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = document.getElementById("productPrice").value;
  const stock = document.getElementById("productStock").value;
  const productId = document.getElementById("productId").value; // Assuming you have a hidden input for product ID
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

function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}

async function deleteProduct(productId) {
  // Show confirmation modal
  const confirmation = confirm(
    "¿Estás seguro de que deseas eliminar este producto?",
  );
  if (!confirmation) {
    return; // Exit if the user cancels
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
      await fetchCatalogo(); // Refresh the catalog after deletion
      alert("Producto eliminado exitosamente");
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

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
    if (response.ok) {
      document.getElementById("productName").value = data.data.name;
      document.getElementById("productPrice").value = data.data.price;
      document.getElementById("productDescription").value =
        data.data.description;
      document.getElementById("productStock").value = data.data.stock;
      document.getElementById("productId").value = data.data._id; // Assuming you have a hidden input for product ID
    } else {
      alert("Error al obtener los detalles del producto");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

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

function openProductModal() {
  document.getElementById("create-product-modal").style.display = "block";
  overlay.style.display = "block";
}

document.getElementById("product-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("productName").value);
  formData.append("description", document.getElementById("productDescription").value);
  formData.append("price", document.getElementById("productPrice").value);
  formData.append("stock", document.getElementById("productStock").value);
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
