// Função para salvar os dados do profissional no localStorage e redirecionar para a página inicial
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("professionalForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = event.target.name.value;
            const crm = event.target.cpf_cnpj.value;
            const email = event.target.email.value;
            const phone = event.target.phone.value;
            const profession = event.target.profession.value;
            const photoFile = event.target.photo.files[0];

            // Função para converter a imagem em Base64
            if (photoFile) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const photoURL = reader.result;
                    const professionalData = {
                        name,
                        crm,
                        email,
                        phone,
                        profession,
                        photoURL
                    };
                    const professionals = JSON.parse(localStorage.getItem("professionals")) || [];
                    professionals.push(professionalData);

                    localStorage.setItem("professionals", JSON.stringify(professionals));

                    window.location.href = "index.html";
                };
                reader.readAsDataURL(photoFile);
            } else {
                alert("Por favor, selecione uma foto.");
            }
        });
    } else {
        displayProfessionals();
    }
});

// Função para exibir os dados de todos os profissionais cadastrados na página inicial
function displayProfessionals() {
    const professionalsGrid = document.getElementById("professionalsGrid");
    const professionals = JSON.parse(localStorage.getItem("professionals")) || [];

    if (professionals.length > 0) {

        professionalsGrid.innerHTML = "";
        professionals.forEach(professional => {
            const professionalCard = document.createElement("div");
            professionalCard.classList.add("doctors__card");
            professionalCard.innerHTML = `
                <div class="doctors__card__image">
                    <img src="${professional.photoURL}" alt="${professional.name}" />
                    <div class="doctors__socials">
                        <span><i class="ri-instagram-line"></i></span>
                        <span><i class="ri-facebook-fill"></i></span>
                        <span><i class="ri-heart-fill"></i></span>
                        <span><i class="ri-twitter-fill"></i></span>
                    </div>
                </div>
                <div class="doctors__card__content">
                    <h4>${professional.name}</h4>
                    <p>Especialidade: ${professional.profession}</p>
                    <p>CRM: ${professional.crm}</p>
                    <p>E-mail: ${professional.email}</p>
                    <p>Telefone: ${professional.phone}</p>
                </div>
            `;
            professionalsGrid.appendChild(professionalCard);
        });
    } else {
        professionalsGrid.innerHTML = "<p>Nenhum serviço disponível no momento</p>";
    }
}




  
