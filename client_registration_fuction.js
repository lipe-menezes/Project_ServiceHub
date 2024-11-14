import { Database } from "./services";

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

    // apenas meio que "traduzindo" o clientData para o construtor da pessoa para então mandá-la ao banco de dados
    const client = new Database.Person(clientData.fullName,clientData.cpf,clientData.email,clientData.phone,clientData.password);
    Database.add_to_Pessoa(client); // adiciona a pessoa cadastrada ao banco de dados

    // Salvar o cliente no localStorage usando o CPF como chave de acesso
    localStorage.setItem(`client_${cpf}`, JSON.stringify(clientData));

    alert("Cadastro realizado com sucesso!");

    // Limpa o formulário
    document.getElementById("clientForm").reset();
}