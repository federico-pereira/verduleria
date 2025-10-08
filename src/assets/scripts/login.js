function loginCheck() {

    var username = document.getElementById('username').value;
    var passwd = document.getElementById('password').value;
    
    console.log(username);
    console.log(passwd);

    if (username != 'admin' || passwd != '1234') {
        alert('Login incorrecto, intente de nuevo');
    } else {
        window.location.href = '../index.html'
    }
}