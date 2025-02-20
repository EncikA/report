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

// Function to format date as dd/mm/yyyy with validation
function formatDate(inputDate) {
    // Split the input date into parts
    const parts = inputDate.split('-');
    if (parts.length !== 3) return 'Invalid Date'; // Basic check

    const [year, month, day] = parts;

    // Validate using Date object (month is 0-based in JS)
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return 'Invalid Date';

    // Pad day and month with leading zeros
    const paddedDay = String(day).padStart(2, '0');
    const paddedMonth = String(month).padStart(2, '0');

    return `${paddedDay}/${paddedMonth}/${year}`;
}

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('images');

dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from resetting

    // Get and format the date
    const rawDate = document.getElementById('date').value;
    const formattedDate = formatDate(rawDate);

    // Check if the date is valid
    if (formattedDate === 'Invalid Date') {
        alert('Please enter a valid date in the format DD/MM/YYYY.');
        return; // Stop submission if invalid
    }

    // Collect form data
    const formData = {
        programName: document.getElementById('programName').value,
        date: formattedDate, // Use the validated and formatted date
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
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file);
        });
    });

    // Further code for handling the form submission and generating the output...
});
