// Function to reformat date from dd/mm/yyyy to dd-mm-yyyy for internal use
function formatDateForOutput(inputDate) {
    const dateParts = inputDate.split('/'); // Split the date into parts
    if (dateParts.length === 3) {
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        return `${day}-${month}-${year}`; // Reformat to dd-mm-yyyy for internal use
    }
    return inputDate; // Return the original date if formatting fails
}

// Function to format date as dd/mm/yyyy while typing
function formatDateInput(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    input.value = value;
}

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('images');

dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from resetting

    // Get and validate the date
    const rawDate = document.getElementById('date').value;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
        alert('Please enter a valid date in the format DD/MM/YYYY.');
        return;
    }

    // Collect form data
    const formData = {
        programName: document.getElementById('programName').value,
        date: rawDate, // Use formatted date
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        targetAudience: document.getElementById('targetAudience').value,
        objectives: document.getElementById('objectives').value,
        activities: document.getElementById('activities').value,
        strengths: document.getElementById('strengths').value,
        weaknesses: document.getElementById('weaknesses').value,
        preparedBy: document.getElementById('preparedBy').value,
        position: document.getElementById('position').value
    };

    // Handle image uploads
    const imageFiles = Array.from(document.getElementById('images').files);
    const imagePreviews = imageFiles.slice(0, 4).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file);
        });
    });

    // Further code for handling the form submission and generating the output...
});
