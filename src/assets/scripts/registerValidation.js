
// XSS Check to sanitize user input
export const XSSCheck = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
};

// Validation for Username
export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,12}$/;
    return usernameRegex.test(username);
};

// Validation for Name (first and last)
export const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÿáéíóúÁÉÍÓÚñÑ'-]+( [A-Za-zÀ-ÿáéíóúÁÉÍÓÚñÑ'-]+)*$/;
    return nameRegex.test(name);
};

// Validation for Email
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Validation for Password
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
    return passwordRegex.test(password);
};

// Validate Date of Birth (should be within the last 100 years)
export const validateDateOfBirth = (dob) => {
    const today = new Date();
    const yearsAgo = new Date();
    yearsAgo.setFullYear(today.getFullYear() - 100);
    return dob <= today && dob >= yearsAgo;
};

// Main registration validation function
export const validateRegistration = (username, firstName, lastName, email, dob, password, repeatPassword) => {
    if (!validateUsername(username)) {
        return { isValid: false, message: 'Nombre de usuario incorrecto, 4-12 caracteres solo alfanumericos' };
    }

    if (!validateName(firstName)) {
        return { isValid: false, message: 'Nombre imposible, intente de nuevo' };
    }

    if (!validateName(lastName)) {
        return { isValid: false, message: 'Apellido imposible, intentar de nuevo' };
    }

    if (!validateEmail(email)) {
        return { isValid: false, message: 'Email incorrecto, intente de nuevo' };
    }

    if (!validateDateOfBirth(dob)) {
        return { isValid: false, message: 'Fecha no puede ser más de 100 años de antigüedad o mayor que hoy' };
    }

    if (password !== repeatPassword) {
        return { isValid: false, message: 'Contraseñas no son iguales, confirme de nuevo' };
    }

    if (!validatePassword(password)) {
        return { isValid: false, message: 'Contraseña invalida, 6-16, al menos una letra y un numero, sin simbolos' };
    }

    return { isValid: true, message: 'Confirmado! espere un segundo.' };
};
