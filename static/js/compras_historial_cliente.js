//se trae la lista de compras y la pega en la tabla de historial de compras del cliente
async function fetchOrders() {
    try {
        let response = await fetch('http://localhost:3000/api/ventas/list'); 
        let data = await response.json();
        
        let tableBody = document.getElementById('ordersBody');
        tableBody.innerHTML = ''; 
        
        data.data.forEach(order => {
            let row = document.createElement('tr');
            const products = order.products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                };
                return ``
            });
            row.innerHTML = `
                <td>${order.name}</td>
                <td>${order.email}</td>
                <td>${order.phone}</td>
                <td>${order.price}</td>
                <td>${order.address}</td>
                <td>${order.products.join(';')}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching sell orders:', error);
    }
}

fetchOrders(); // Llamar a la función para obtener y mostrar los pedidos