function validateProfessionalForm(event) {
    event.preventDefault(); 

    const name = document.querySelector('input[name="name"]')?.value || '';
    const cpfCnpj = document.querySelector('input[name="cpf_cnpj"]')?.value || '';
    const email = document.querySelector('input[name="email"]')?.value || '';
    const phone = document.querySelector('input[name="phone"]')?.value || '';
    const profession = document.querySelector('input[name="profession"]')?.value || '';
    const photoInput = document.querySelector('input[name="photo"]');
    const photo = photoInput?.files[0];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !cpfCnpj || !email || !phone || !profession || !photo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    const photoURL = URL.createObjectURL(photo);

    const profissionais = JSON.parse(localStorage.getItem("professionals")) || [];
    profissionais.push({ name, cpfCnpj, email, phone, profession, photoURL });
    localStorage.setItem("professionals", JSON.stringify(profissionais));

    window.location.href = "index.html";
}
document.getElementById('professionalForm')?.addEventListener('submit', validateProfessionalForm);

function loadProfessionals() {
    const serviceList = document.getElementById('serviceList'); 
    const professionalsGrid = document.getElementById("professionalsGrid"); 
    const profissionais = JSON.parse(localStorage.getItem("professionals")) || [];

    if (serviceList) serviceList.innerHTML = '';
    if (professionalsGrid) professionalsGrid.innerHTML = '';
    if (profissionais.length === 0) {
        if (serviceList) serviceList.innerHTML = '<p>Nenhum serviço disponível no momento.</p>';
        if (professionalsGrid) professionalsGrid.innerHTML = '<p>Nenhum serviço disponível no momento.</p>';
        return;
    }

    profissionais.forEach(profissional => {
        
        if (serviceList) {
            const professionalCard = document.createElement('div');
            professionalCard.classList.add('professional_card');

            professionalCard.innerHTML = `
                <img src="${profissional.photoURL}" alt="${profissional.name}" class="professional_photo" />
                <h3>${profissional.name}</h3>
                <p>${profissional.profession}</p>
            `;

            serviceList.appendChild(professionalCard);
        }

        if (professionalsGrid) {
            const professionalCard = document.createElement("div");
            professionalCard.classList.add("doctors__card");

            professionalCard.innerHTML = `
                <div class="doctors__card__image">
                    <img src="${profissional.photoURL}" alt="${profissional.name}" />
                    <div class="doctors__socials">
                        <span><i class="ri-instagram-line"></i></span>
                        <span><i class="ri-facebook-fill"></i></span>
                        <span><i class="ri-heart-fill"></i></span>
                        <span><i class="ri-twitter-fill"></i></span>
                    </div>
                </div>
                <h4>${profissional.name}</h4>
                <p>${profissional.profession}</p>
            `;

            professionalsGrid.appendChild(professionalCard);
        }
    });
}

window.onload = loadProfessionals;


  
