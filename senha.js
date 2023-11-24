function verificar_senha() {
    var senha_de_entrada = document.getElementById('password-input').value;
    var hashed = md5(senha_de_entrada);

    if (hashed === "ff64a1c43498d955147518733ac88c7c") {
        window.location.href = "principal.html";
    } else {
        alert('Senha incorreta. Tente novamente.');
    }
}