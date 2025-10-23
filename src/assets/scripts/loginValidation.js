// loginValidation.js

// XSS Check to sanitize user input
export const XSSCheck = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
};

// Username and password validation regex
export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,12}$/;
    return usernameRegex.test(username);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
    return passwordRegex.test(password);
};

// Example valid credentials (for demo purposes)
export const validUsername = "admin";
export const validPassword = "cosacosa1234";

// Login validation function
export const validateLogin = (username, password) => {
    if (!validateUsername(username)) {
        return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta" };
    }

    if (!validatePassword(password)) {
        return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta" };
    }

    // Check if the credentials match
    if (username === validUsername && password === validPassword) {
        return { isValid: true, message: "Login valido, volviendo al menu principal" };
    }

    return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta" };
};
