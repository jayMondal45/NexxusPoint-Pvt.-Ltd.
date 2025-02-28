// Fetch all countries and their currencies
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const countrySelect = document.getElementById('country');

        countries.forEach(country => {
            const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : 'N/A';
            const option = document.createElement('option');
            option.value = currencyCode;
            option.textContent = `${country.name.common}`;
            countrySelect.appendChild(option);
        });

        countrySelect.options[0].textContent = "Select Country";
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

// Update currency when country is selected
function updateCurrency() {
    const country = document.getElementById('country');
    const currency = document.getElementById('currency');
    currency.value = country.value || '---';
    checkForm();
}

// Show card section only when all fields are filled
function checkForm() {
    const country = document.getElementById('country').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const cardDetails = document.getElementById('card-details');

    if (country && name && email) {
        cardDetails.classList.remove('hidden');
        cardDetails.classList.add('visible');
    } else {
        cardDetails.classList.remove('visible');
        cardDetails.classList.add('hidden');
    }
}

// Handle form submission
document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Payment processed successfully!');
});

// Load countries when page loads
window.onload = fetchCountries;