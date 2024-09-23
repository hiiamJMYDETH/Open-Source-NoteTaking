dragElement(document.getElementById('add-bulletpoints-box'));

function toggleBulletPoint() {
    var table = document.getElementById('add-bulletpoints-box');
    console.log(enableBulletPoints);
    if (enableBulletPoints === false) {
        enableBulletPoints = true;
        table.style.display = 'grid';
        textInput.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                event.preventDefault();
                addBulletPoint(this);
            }
            if (event.key == 'Tab') {
                ;
            }
        })
    }
    else {
        enableBulletPoints = false;
        table.style.display = 'none';
    }
}

function addBulletPoint(editableEvent) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Create a new line with a bullet point
    const bulletLine = document.createElement('div');
    bulletLine.textContent = '• ';
    bulletLine.style.textAlign = 'left'; // Ensure it's aligned to the left

    // Insert the new bullet point line at the cursor position
    range.insertNode(bulletLine);

    // Move the cursor to just after the bullet point
    range.setStart(bulletLine, 1); // Start after the bullet point
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}