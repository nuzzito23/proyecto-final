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