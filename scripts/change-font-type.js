dragElement(document.getElementById('change-font-type-box'));

function changeFontToggle() {
    var table = document.getElementById('change-font-type-box');

    if (table === null) {
        alert('Not defined yet');
    }
    else {
        if (table.style.display === 'none') {
            table.style.display = 'grid';
        }
        else {
            table.style.display = 'none';
        }
    }
}

function confirmChanges() {
    var fontFamily = document.getElementById('change-font-family-search').value;
    var fontSize = document.getElementById('change-font-size').value;
    var textbox = document.getElementById('note');
    switch (fontFamily) {
        case 'Arial':
            textbox.style.fontFamily = 'Arial';
            break;
        case 'Times New Roman':
            textbox.style.fontFamily = 'Times New Roman';
            break;
        default:
            alert('Function not defined');
    }
    textbox.style.fontSize = fontSize + 'px';
}

function alignLeft() {
    var textbox = document.getElementById('note');
    textbox.style.textAlign = 'left';
}

function alignCenter() {
    var textbox = document.getElementById('note');
    textbox.style.textAlign = 'center';
}

function alignRight() {
    var textbox = document.getElementById('note');
    textbox.style.textAlign = 'right';
}