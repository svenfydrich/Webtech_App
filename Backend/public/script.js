const BASE_URL = '/api/travels';

function displayError(message) {
    alert(message || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
}

// Reisen abrufen
if (document.getElementById('travels-list')) {
    axios.get(BASE_URL)
        .then(response => {
            const travels = response.data;
            const travelList = document.getElementById('travels-list');

            if (!travels.length) {
                travelList.innerHTML = '<p>Keine Reisen gefunden.</p>';
                return;
            }

            travelList.innerHTML = travels.map(travel => `
                <article class="travel" role="listitem">
                    <h3>${travel.country} (${travel.duration} Tage)</h3>
                    <p><strong>Reiseführer:</strong> ${travel.tourGuide.name} (${travel.tourGuide.languages.join(', ')})</p>
                    <p><strong>Kontakt:</strong> E-Mail: ${travel.tourGuide.email}, Telefon: ${travel.tourGuide.phone}</p>
                    <p><strong>Städte:</strong></p>
                    <ul>
                        ${travel.cities.map(city => `<li>${city.cityName} (${city.daysSpent} Tage)</li>`).join('')}
                    </ul>
                    <p><strong>Weitere Details:</strong></p>
                    <ul>
                        <li><strong>Gesamtdauer:</strong> ${travel.duration} Tage</li>
                        <li><strong>Anzahl besuchter Städte:</strong> ${travel.cities.length}</li>
                    </ul>
                </article>
            `).join('');
        })
}

// Reise erstellen
if (document.getElementById('add-travel-form')) {
    document.getElementById('add-travel-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const duration = parseInt(document.getElementById('duration').value, 10);
        const citiesInput = document.getElementById('cities').value;
        const guideName = document.getElementById('guideName').value;
        const guideLanguages = document.getElementById('guideLanguages').value.split(',').map(lang => lang.trim());
        const guideEmail = document.getElementById('guideEmail').value;
        const guidePhone = document.getElementById('guidePhone').value;

        if (isNaN(duration) || duration <= 0) {
            alert('Bitte geben Sie eine gültige Dauer an.');
            return;
        }

        const cities = citiesInput.split(';').map(cityStr => {
            const [cityName, daysSpent] = cityStr.split(',');
            return { cityName: cityName.trim(), daysSpent: parseInt(daysSpent.trim(), 10) };
        });

        const tourGuide = {
            name: guideName,
            languages: guideLanguages,
            phone: guidePhone,
            email: guideEmail
        };

        axios.post(BASE_URL, { country, duration, cities, tourGuide })
            .then(() => {
                alert('Reise erfolgreich erstellt!');
                window.location.href = 'index.html';
            })
    });
}
