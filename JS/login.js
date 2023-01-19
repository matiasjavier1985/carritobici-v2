

function singup(e) {
    event.preventDefault();
    const username = document.getElementById("user").value
    const password = document.getElementById("password").value
    const email = document.getElementById("email").value
    let user = {username: username,password: password, email:email};
    let json = JSON.stringify(user);
    localStorage.setItem(username, json)
}

function login(e){
    event.preventDefault();
    const username = document.getElementById("user").value
    const password = document.getElementById("password").value
    const resultlogin= document.getElementById("resultlogin")
    let user = localStorage.getItem(username)
    let data = JSON.parse(user)
    console.log(data);

    if(username == (data.username) && password== (data.password)){
        resultlogin.innerHTML =`Correcto`
        window.location="./index.html"
    }else{
        resultlogin.innerHTML =`Contraseña incorrecto`
    }
}
