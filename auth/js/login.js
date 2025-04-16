document.querySelector('#enter').addEventListener('click', function(event) {
    event.preventDefault(); //Impedir que el formulario se envíe vacio 

    const email = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;

    //Validando el email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    //Validando la contraseña
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    login(email,password)
});
const login = async (email,password) => {
const response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
});

if (!response.ok) {
    console.error('Error en el login:', response.status);
    return;
}

const data = await response.json();
console.log('Login exitoso:', data);
}
//Enviando el formulario
