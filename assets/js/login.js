document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = XSSCheck(document.getElementById("username").value.trim());
    const password = XSSCheck(document.getElementById("password").value.trim());
    const resultElement = document.getElementById("result");

    resultElement.textContent = ""; // Reset de mensaje

    // Regex
    const usernameRegex = /^[a-zA-Z0-9]{4,12}$/; // 4–12, alfanumerico
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/; // 6-16, al menos una letra y un numero, sin simbolos

    // Prueba
    const validUsername = "admin";
    const validPassword = "1234";

    if (!usernameRegex.test(username)) {
        resultElement.textContent = "Nombre de usuario solo entre 4-12 caracteres, solo letras y numeros.";
        resultElement.style.color = "red";
        
    }

    if (!passwordRegex.test(password)) {
        resultElement.textContent = "Contraseña tiene que ser entre 4-12 caracteres, al menos una letra y un numero, sin simbolos";
        resultElement.style.color = "red";

        }
    
    if (username == validUsername && password == validPassword) {
        console.log("Success");
        resultElement.textContent = "Login valido, volviendo al menu principal";
        resultElement.style.color = "green";
        setTimeout(function() {
            window.location.replace("../index.html");
        }, 5000); // 5 segundos de delay para ver el mensaje



    }

});

// Check XSS
function XSSCheck(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

