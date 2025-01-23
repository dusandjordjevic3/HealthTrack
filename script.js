// Event listener za "healthForm" formu
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Sprečava da se stranica osveži prilikom podnošenja forme
    
    // Dobijanje vrednosti unetih podataka
    var steps = parseInt(document.getElementById('steps').value);
    var calories = parseInt(document.getElementById('calories').value);
    var water = parseFloat(document.getElementById('water').value);
    var sleep = parseFloat(document.getElementById('sleep').value);

    // Ažuriranje grafikona novim podacima
    var selectedDay = parseInt(document.getElementById('daySelect').value); // Dobijanje odabranog dana
    healthChart.data.datasets[0].data[selectedDay] = steps; // Ažuriraj broj koraka za izabrani dan
    
    // Obezbeđivanje da broj podataka ne premašuje 7 (dan u nedelji)
    if (healthChart.data.datasets[0].data.length > 7) {
        healthChart.data.datasets[0].data.shift(); // Uklanjanje prve tačke podataka ako ih ima više od 7
    }

    // Ažuriranje grafikona
    healthChart.update();

    // Pozivanje funkcije da bi se prikazale preporuke
    giveStepRecommendations(steps);
    giveCalorieRecommendations(calories);
    giveWaterRecommendations(water);
    giveSleepRecommendations(sleep);
});

// Funkcija za izračunavanje razlike u kalorijama i prikaz poruke
function calculateCalories(event) {
    event.preventDefault(); // Sprečava da se stranica osveži prilikom podnošenja forme
    
    // Dobijanje unosa kalorija i potrošnju kalorija iz postojećih unosa
    const calorieIntake = parseInt(document.getElementById("calorieIntake").value);
    const calorieConsumption = parseInt(document.getElementById("calorieConsumption").value);

    // Računanje razlike
    const calorieDifference = calorieIntake - calorieConsumption;

    // Odabir pola (Muškarac ili Žena)
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Inicijalizacija poruke o rezultatu
    let messageresult = `Rezultat: ${calorieDifference} kalorija! `;

    let message = '';

    /* Funkcija if u kojoj se prikazuje poruka ispod rezultata, u zavisnosti od toga šta korisnik ili korisnica unesu u kalkulatoru, za manje,
    više, ili tačno onoliko koliko treba kalorija, postoji posebna poruka koja se prikazuje ispod samog rezultata */
    
    if (gender === "male") {
        if (calorieDifference < 2000) {
            message = "Pojačajte slobodno ishranu, makar do 2000 kalorija.";
        } else if (calorieDifference >= 2000 && calorieDifference <= 2500) {
            message = "Vaša ishrana je perfektna, samo tako nastavite!";
        } else if (calorieDifference > 2500) {
            message = "Smanjite malo unos kalorija, ili povećajte potrošnju istih, da bi sišli ispod 2500.";
        }
    } else if (gender === "female") {
        if (calorieDifference < 1500) {
            message = "Pojačajte slobodno ishranu, makar do 1500 kalorija.";
        } else if (calorieDifference >= 1500 && calorieDifference <= 1800) {
            message = "Vaša ishrana je perfektna, samo tako nastavite!";
        } else if (calorieDifference > 1800) {
            message = "Smanjite malo unos kalorija, ili povećajte potrošnju istih, da bi sišli ispod 1800.";
        }
    }

        // Postavljanje boja za određeni rezultat
        let resultColor = "#2271b1"; // Podrazumevana boja za rezultat u početku (kod napisan znači plava boja u paleti)

        if (message === "Pojačajte slobodno ishranu, makar do 1500 kalorija." || 
            message === "Smanjite malo unos kalorija, ili povećajte potrošnju istih, da bi sišli ispod 1800." ||
            message === "Pojačajte slobodno ishranu, makar do 2000 kalorija." ||
            message === "Smanjite malo unos kalorija, ili povećajte potrošnju istih, da bi sišli ispod 2500.") {
            resultColor = "red"; /* Sve poruke koje su ovde prikazane će biti obojene u crveno, što za muškarca, što za ženu,
            ukoliko unesu dnevno manje, ili više kalorija od propisanog, tekst će biti crven kao upozorenje */
        }

        // Prikaz tačnog rezultata u kalorijama, kao i poruke ispod njega
        document.getElementById("calorieResult").innerText = messageresult + "\n" + message;

        // Primenjivanje boje na rezultat i poruku
        document.getElementById("calorieResult").style.color = resultColor;

        // Prikaz kontejnera rezultata (u početku je bio sakriven)
        document.getElementById("calorieResultContainer").style.display = "block";
    }

// Event listener za submit formu
document.getElementById("calorieForm").addEventListener("submit", calculateCalories);

// Funkcija za prikaz preporučenih koraka
function giveStepRecommendations(steps) {
    let recommendation = '';
    if (steps < 5000) {
        recommendation = 'Pokušajte da pređete više od 5000 koraka dnevno.';
    } else if (steps < 10000) {
        recommendation = 'Odlično! Nastavite da vežbate za bolju kondiciju.';
    } else {
        recommendation = 'Izuzetno! Vaš nivo aktivnosti je vrlo dobar!';
    }
    document.getElementById('recommendationSteps').innerHTML = recommendation;
}

// Funkcija za prikaz preporučenih kalorija
function giveCalorieRecommendations(calories) {
    let recommendation = '';

    if (calories < 1500) {
        recommendation = 'Pokušajte da unesete makar 1500 kalorija dnevno.';
    } else if (calories < 2500) {
        recommendation = 'Odlično! Samo nastavite sa takvom ishranom!';
    } else {
        recommendation = 'Pokušajte da unesete manje od 2500 kalorija dnevno';
    }

    // Ažuriraj preporuku u HTML-u
    document.getElementById('recommendationCalories').innerHTML = recommendation;
}

// Funkcija za prikaz preporučenog unosa vode
function giveWaterRecommendations(water) {
    let recommendation = '';
    if (water < 2) {
        recommendation = 'Pokušajte da pijete više vode. Preporučuje se najmanje 2 litra dnevno.';
    } else {
        recommendation = 'Odlično! Nastavite sa unosom dovoljno tečnosti.';
    }
    document.getElementById('recommendationWater').innerHTML = recommendation;
}

// Funkcija za prikaz preporučenog trajanja sna
function giveSleepRecommendations(sleep) {
    let recommendation = '';
    if (sleep < 6) {
        recommendation = 'Pokušajte da spavate barem 7-8 sati noću.';
    } else if (sleep < 8) {
        recommendation = 'Dobro! Održavajte dobar ritam spavanja.';
    } else {
        recommendation = 'Izuzetno! Odmor je ključ za zdravlje.';
    }
    document.getElementById('recommendationSleep').innerHTML = recommendation;
}

// Event listener za kontakt formu- slanje kontakt forme
document.getElementById('contact').addEventListener('submit', function(e) {
    e.preventDefault(); // Sprečava da se stranica osveži prilikom podnošenja forme

    // Dobijanje unetih podatka iz obrasca za kontakt
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Poruka koja prikazuje da je uspešno ispunjena kontakt forma i poslata 
    alert("Poruka uspešno poslata!");

    setTimeout(function() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        console.log('Manually reset the form fields');
    }, 100);
});

// Prikaz dugmeta nakon pomeranja nadole 200 piksela (sakriveno je kada je na vrhu)
window.addEventListener('scroll', function() {
    let button = document.getElementById("goToTopButton");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = "block";  // Prikaži dugme kada skrolujete nadole
    } else {
        button.style.display = "none";  // Sakriva se dugme kada je korisnik na vrhu stranice
    }
});

// Sama funkcija dugmeta koje služi za vraćanje korisnika na vrh stranice ukoliko ga klikne
function scrollToTop() { 
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'  // Glatko skrolovanje do vrha stranice
    });
}

// funkcija za prikaz hamburger menija 
document.getElementById('hamburgerMenu').addEventListener('click', function() {
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.toggle('show');  // prikaz menija
});


// Funkcija za svetli i tamni režim websajta
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const modeIcon = document.getElementById('modeIcon');

    // Izmeni ikonicu u zavisnosti u kom režimu je websajt
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.src = 'sun.png'; // Sunce ikonica
        modeIcon.alt = 'Sun Icon';
    } else {
        modeIcon.src = 'night-mode.png'; // Mesec ikonica
        modeIcon.alt = 'Moon Icon';
    }
});

// Proveri da li postoji tema u LocalStorage-u, ako ima, primeni je 
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerText = 'Switch to Light Mode'; // Change button text
    }
});

// Event listener za uključivanje i isključivanje tamnom režima
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);