document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('.menu-icon');
    const menuOptions = document.getElementById('admin-menu-options');
    const salesHistoryButton = document.getElementById('view-sales-history');
    const salesHistorySection = document.getElementById('sales-history');

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
