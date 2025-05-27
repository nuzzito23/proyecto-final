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
saveToken(data.token); // Guardar el token en localStorage
redirectAfterLogin(data); // Redirigir después de iniciar sesión
console.log('Login exitoso:', data);
}
//Enviando el formulario

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('admin-login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = './login_admin.html';
        });
    }
});

function saveToken(token) {
    localStorage.setItem("authToken", token);
}

function redirectAfterLogin() {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
        window.location.href = "./index.html"; 
    }
}