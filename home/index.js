const cart = [];

        document.querySelectorAll('.add').forEach((button, index) => {
            button.addEventListener('click', () => {
                const item = document.querySelectorAll('.item-catalogo')[index];
                const productName = item.querySelector('h3').textContent;
                cart.push(productName);
                alert(`${productName} agregado al carrito.`);
                console.log('Carrito:', cart);
            });
        });
        let cartCount = 0;

        document.querySelectorAll('.add').forEach((button) => {
            button.addEventListener('click', () => {
                cartCount++;
                document.getElementById('cart-count').textContent = cartCount;
            });
        });