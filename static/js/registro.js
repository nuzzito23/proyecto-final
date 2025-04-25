document.querySelector('#enter').addEventListener('click', function(event) {
    event.preventDefault(); //Impedir que el formulario se envíe vacio 

    const user = document.getElementById('usuario').value;
    const password = document.getElementById('contrasena').value;

    //Validando el email
    const userPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userPattern.test(user)) {
        alert('Por favor, ingrese un usuario válido.');
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