document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = './html/login.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const registButton = document.getElementById('registro');
  if (registButton) {
      registButton.addEventListener('click', () => {
          window.location.href = './html/registro.html';
      });
  }
});