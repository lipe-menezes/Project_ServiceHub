// Função para abrir o formulário de login
function openLoginForm() {
  document.getElementById("loginForm").style.display = "block";
}
  
  // Função para fechar o formulário de login
function closeLoginForm() {
  document.getElementById("loginForm").style.display = "none";
}
  
function login() {
  const cpf = document.getElementById("loginCPF").value;
  const password = document.getElementById("loginPassword").value;

  const client = Database.getPersonByTag("CPF",cpf);
  
  if (client) {
    if (client.password === password) {
      alert("Login realizado com sucesso!");
      localStorage.setItem("loggedInClient", cpf); // Define o usuário como logado
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      alert("Senha incorreta. Tente novamente.");
    }
  } else {
    alert("CPF não encontrado. Verifique seus dados ou cadastre-se.");
  }
}