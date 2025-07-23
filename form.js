document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = {
            fields: [
                {
                    name: "firstname",
                    value: document.getElementById("firstname").value
                },
                {
                    name: "lastname",
                    value: document.getElementById("lastname").value
                },
                {
                    name: "email",
                    value: document.getElementById("email").value
                },
                {
                    name: "phone",
                    value: document.getElementById("phone").value
                },
                {
                    name: "message",
                    value: document.getElementById("message").value
                }
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title
            }
        };

        fetch("https://api.hsforms.com/submissions/v3/integration/submit/47924965/02de69cc-eda2-45e3-986a-a92ae5577403", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            const formOutputPlace = document.getElementById("contactForm");
            let outputMsg = document.createElement("p");
            if (response.ok) {
                form.reset();
                outputMsg.className = "contact-output contact-output__success";
                outputMsg.textContent = "Votre message a bien été envoyé. Merci, et à bientôt.";
            } else {
                outputMsg.className = "contact-output contact-output__error";
                outputMsg.textContent = "Il y a un problème. Veuillez recommencer.";
            }
            formOutputPlace.appendChild(outputMsg);
        })
        .catch(error => {
            console.error("Erreur d’envoi :", error);
            const formOutputPlace = document.getElementById("contactForm");
            let errorMsg = document.createElement("p");
            errorMsg.className = "contact-output contact-output__error";
            errorMsg.textContent = "Connexion impossible. Recommencez plus tard.";
            formOutputPlace.appendChild(errorMsg);
        });
    });
});