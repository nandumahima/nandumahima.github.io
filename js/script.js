function toggleInfo(boxNumber) {
    var infoBox = document.getElementById('info' + boxNumber);

    // Toggle visibility of info box
    if (infoBox.style.display === 'block') {
        infoBox.style.display = 'none';
    } else {
        // Hide all other info boxes
        var infoBoxes = document.querySelectorAll('.info-box');
        infoBoxes.forEach(function(box) {
            box.style.display = 'none';
        });

        // Show the clicked info box
        infoBox.style.display = 'block';
    }
}

const card = document.getElementById('card2');
function handleCardClick(){
     // Navigate to the new page
     window.location.href = 'html/wedding_registry.html';

     // Remove the event listener after it has been triggered once
     card.removeEventListener('click', handleCardClick);
}
card.addEventListener('click', handleCardClick);

