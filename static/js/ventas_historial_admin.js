async function fetchOrders() {
    try {
        let response = await fetch('http://localhost:3000/api/ventas/list'); // Replace with your backend URL
        let data = await response.json();
        
        let tableBody = document.getElementById('ordersBody');
        tableBody.innerHTML = ''; // Clear existing rows
        
        data.data.forEach(order => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.nombre}</td>
                <td>${order.email}</td>
                <td>${order.phone}</td>
                <td>${order.price}</td>
                <td>${order.address}</td>
                <td>${JSON.stringify(order.products)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching sell orders:', error);
    }
}

fetchOrders(); // Call function to fetch and display orders