// Função para salvar os dados do profissional no localStorage e redirecionar para a página index
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
            const instagram = event.target.instagram.value || ""; 
            const facebook = event.target.facebook.value || "";   
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
                        instagram,
                    facebook,
                        photoURL
                    };
                    const professionals = JSON.parse(localStorage.getItem("professionals")) || [];
                    professionals.push(professionalData);
                    localStorage.setItem("professionals", JSON.stringify(professionals));

                    window.location.href = "index.html";
                };

                reader.readAsDataURL(photoFile); //Converter a imagem/foto para Base64 
            } else {
                alert("Por favor, selecione uma foto.");
            }
        });
    } else {
        displayProfessionals();
    }
});
function displayProfessionals() {
    const professionalsGrid = document.getElementById("professionalsGrid");
    const professionals = JSON.parse(localStorage.getItem("professionals")) || [];

    if (professionals.length > 0) {
        professionalsGrid.innerHTML = "";

        // Cria um cartão para cada profissional cadastrado
        professionals.forEach(professional => {
            const professionalCard = document.createElement("div");
            professionalCard.classList.add("doctors__card");
            professionalCard.innerHTML = `
                <div class="doctors__card__image">
                    <img src="${professional.photoURL}" alt="${professional.name}" />
                    <div class="doctors__socials">
                        ${professional.instagram ? `<a href="${professional.instagram}" target="_blank"><span><i class="ri-instagram-line"></i></span></a>` : ""}
                        ${professional.facebook ? `<a href="${professional.facebook}" target="_blank"><span><i class="ri-facebook-fill"></i></span></a>` : ""}
                        <a href="https://wa.me/${professional.phone}" target="_blank"><span><i class="ri-whatsapp-fill"></i></span></a>
                    </div>
            </div>
        <div class="doctors__card__content">
            <h4>${professional.name}</h4>
            <p>Profissão: ${professional.profession}</p>
            <p>CRM: ${professional.crm}</p>
            <p>E-mail: ${professional.email}</p>
            <p>Telefone: <a href="https://wa.me/${professional.phone.replace(/\D/g, '')}" target="_blank">${professional.phone}</a></p>
        </div>
            `;
            professionalsGrid.appendChild(professionalCard);
        });
    } else {
        // Exibe a mensagem se não houver profissionais cadastrados
        professionalsGrid.innerHTML = "<p>Nenhum serviço disponível no momento</p>";
    }
}
