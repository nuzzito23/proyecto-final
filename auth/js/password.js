document.querySelector('#enter').addEventListener('click', function(event) {
    event.preventDefault(); //Impedir que el formulario se envíe vacio 

    const email = document.getElementById('correo').value;
    const recoveryPassword = document.getElementById('contrasena-nueva').value;

    //Validando el email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    //Validando la contraseña
    if (recoveryPassword.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    alert('Inicio de sesión exitoso.');
    //Enviando el formulario
});