document.getElementById("register-form").addEventListener("submit", function(event) {

    event.preventDefault(); 

    const username = XSSCheck(document.getElementById('username').value);
    const password = XSSCheck(document.getElementById('password').value);
    const repeatPassword = XSSCheck(document.getElementById('repeatPassword').value);
    const firstName = XSSCheck(document.getElementById('firstName').value);
    const lastName = XSSCheck(document.getElementById('lastName').value);
    const email = XSSCheck(document.getElementById('email').value);
    const dateControl = document.querySelector('input[type="date"]');
    const resultElement = document.getElementById("result");

    resultElement.textContent = ''; // Reset
    resultElement.style.color = 'red';

    // Regex
    const usernameRegex = /^[a-zA-Z0-9]{4,12}$/; // 4–12, alfanumerico
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/; // 6-16, al menos una letra y un numero, sin simbolos
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex =  /^[A-Za-zÀ-ÿáéíóúÁÉÍÓÚñÑ'-]+( [A-Za-zÀ-ÿáéíóúÁÉÍÓÚñÑ'-]+)*$/;
    
    const today = new Date();
    const yearsAgo = new Date();
    yearsAgo.setFullYear(today.getFullYear() - 100);
    today.setHours(0, 0, 0, 0);

    if (!usernameRegex.test(username)) {
        resultElement.textContent = 'Nombre de usuario incorrecto, 4-12 caracteres solo alfanumericos';
        return;
    }

    if (!nameRegex.test(firstName)) {
        resultElement.textContent = 'Nombre imposible, intente de nuevo';
        return;
    } else if (!nameRegex.test(lastName)) {
        resultElement.textContent = 'Apellido imposible, intentar de nuevo';
        return;
    }

    if (!emailRegex.test(email)) {
        resultElement.textContent = 'Email incorrecto, intente de nuevo';
        return;
    }

    if (dateControl.value > today) {
        resultElement.textContent = 'Fecha no puede ser más alta que hoy';
        return;
    } else if (dateControl.value < yearsAgo) {
        resultElement.textContent = 'Fecha no puede ser más de 100 años de antiguedad';
        return;
    }

    if (password != repeatPassword) {
        resultElement.textContent = 'Contraseñas no son iguales, confirme de nuevo';
        return;
    } else if (!passwordRegex.test(password)) {
        resultElement.textContent = 'Contraseña invalida, 6-16, al menos una letra y un numero, sin simbolos';
        return;
    }

    resultElement.textContent = 'Confirmado! espere un segundo.';
    resultElement.style.color = 'green';

    setTimeout(function() {
        window.location.replace("../index.html");
    }, 5000); // 5 segundos de delay para ver el mensaje


});

// Check XSS
function XSSCheck(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}