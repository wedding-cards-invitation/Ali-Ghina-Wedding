// Fetch and load content.html into the #content div
fetch('content.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data;
        setupRSVPButtons();
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });

// Disable right-click (context menu)
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable F12 and other DevTools shortcuts
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
    }
});

// Function to submit RSVP with name and attendance status
function submitRSVP(attendance) {
    const guestName = document.getElementById('guestName').value.trim();
    const googleSheetURL = 'https://script.google.com/macros/s/AKfycbzVqyDjK6c5mocbia2k8CrP4s3H90GkLmvFUIwyhCdRTAtIlQ7noIxdKi5L_QyTb9G-/exec'; 

    if (!guestName) {
        alert('Please enter your name before submitting.');
        return;
    }

    fetch(googleSheetURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: guestName, attending: attendance }),
    }).then(() => {
        alert(`Thank you, ${guestName}, for your response!`);
    }).catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
}

// Attach event listeners to RSVP buttons
function setupRSVPButtons() {
    document.getElementById('yesButton').addEventListener('click', () => submitRSVP('Yes'));
    document.getElementById('noButton').addEventListener('click', () => submitRSVP('No'));
}
