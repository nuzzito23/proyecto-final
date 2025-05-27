document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = './html/login.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const registButton = document.getElementById('registro');
  if (registButton) {
      registButton.addEventListener('click', () => {
          window.location.href = './html/registro.html';
      });
  }
});

// Function to fetch data from the backend
async function fetchCatalogo() {
    try {
      const response = await fetch('http://localhost:3000/api/products/list'); // Adjust the URL as needed
      const data = await response.json();

      // Assume `data` is an array of catalog items
      const catalogoContainer = document.getElementById('catalogo-items');
      catalogoContainer.innerHTML = ''; // Clear the container
      
      data.data.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'item-catalogo';
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
        `;
        catalogoContainer.appendChild(catalogItem);
      });
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  }

  // Call the function on page load
  fetchCatalogo();

  function toggleMenu() {
    document.querySelector(".nav-menu").classList.toggle("active");
}