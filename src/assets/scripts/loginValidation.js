

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


// Login validation function
export const validateLogin = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if (users.length === 0) {
    return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta"};
  }

  const user = users.find(u => u.username === username);

  if (!validateUsername(username)) {
    return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta"};
  }

  if (!validatePassword(password)) {
    return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta"};
  }

  // ✅ clave para no reventar y sumar cobertura de ramas
  if (!user) {
    return { isValid: false, message: "Login invalido, usuario y/o contraseña incorrecta" };
  }

  if (user.password !== password) {
    return { isValid: false, message: "Login invalido, contraseña incorrecta" };
  }

  return { isValid: true, message: "Login valido, volviendo al menu principal" };
};

