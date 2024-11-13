function registerClient() {
    const fullName = document.getElementById("fullName").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!fullName || !cpf || !email || !phone || !password) {
        alert("Por favor, preencha todos os campos.");
    return;
    }

    const clientData = {
    fullName: fullName,
    cpf: cpf,
    email: email,
    phone: phone,
    password: password // Armazena a senha para login 
    };
    // Salvar o cliente no localStorage usando o CPF como chave de acesso
    localStorage.setItem(`client_${cpf}`, JSON.stringify(clientData));

    alert("Cadastro realizado com sucesso!");

    // Limpa o formulário
    document.getElementById("clientForm").reset();
}