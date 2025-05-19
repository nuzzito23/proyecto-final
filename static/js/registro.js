document.querySelector('#enter').addEventListener('click', function(event) {
    event.preventDefault(); //Impedir que el formulario se envíe vacio 

    const name = document.getElementById('nombre').value;
    const phone = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('direccion').value;
    const city = document.getElementById('ciudad').value;
    const country = document.getElementById('pais').value;
    const password = document.getElementById('contrasena').value;

    
    //Validando el nombre
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        alert('El nombre solo puede contener letras y espacios.');
        return;
    }
   
    //Validando el email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un usuario válido.');
        return;
    }

    //Validando el teléfono
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert('El teléfono debe tener 10 dígitos.');
        return;
    }

    //Validando la dirección
    const addressPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    if (!addressPattern.test(address)) {
        alert('La dirección no es válida.');
        return;
    }

    //Validando la ciudad
    const cityPattern = /^[a-zA-Z\s]+$/;
    if (!cityPattern.test(city)) {
        alert('La ciudad solo puede contener letras y espacios.');
        return;
    }

    //Validando el país
    const countryPattern = /^[a-zA-Z\s]+$/;
    if (!countryPattern.test(country)) {
        alert('El país solo puede contener letras y espacios.');
        return;
    }

    //Validando la contraseña
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    alert('Inicio de sesión exitoso.');
    //Enviando el formulario
});

document.addEventListener('DOMContentLoaded', () => {
    const passwordButton = document.getElementsByClassName('new-password');
    if (passwordButton) {
        passwordButton.addEventListener('click', () => {
            window.location.href = './html/password.html';
        });
    }
});