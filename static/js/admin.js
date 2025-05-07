document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('.menu-icon');
  const menuOptions = document.getElementById('admin-menu-options');
  const salesHistoryButton = document.getElementById('view-sales-history');
  const salesHistorySection = document.getElementById('sales-history');
  const cerrarSesionButton = document.getElementById('cerrar-sesion');
  cons

  // Toggle menu visibility
  menuIcon.addEventListener('click', () => {
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
  });

  // Show sales history
  salesHistoryButton.addEventListener('click', () => {
    salesHistorySection.style.display = 'block';
    salesHistorySection.innerHTML = `
            <h2>Historial de Ventas</h2>
            
        `;
  });
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
          <button onclick="closeModal()" class="edit-btn">Editar producto</button>
        `;
      catalogoContainer.appendChild(catalogItem);
    });
  } catch (error) {
    console.error('Error fetching catalog:', error);
  }
}

// Call the function on page load
fetchCatalogo();


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

function openModal() {
  document.getElementById("editModal").style.display = "block";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function saveChanges() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  alert(`Producto actualizado: ${name}, Precio: ${price}`);
  closeModal();
}