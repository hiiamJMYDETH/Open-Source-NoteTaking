// GOAL: Make a notes app that draws using the mouse, works like a Word Document
// and that's it. 

// To-do-list
// - Add a list to the text
// - Make the textbox only moveable when the user's text content is too long
// - Have a page break
// - Make a landscape feature



dragElement(document.getElementById('save-document-box'));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
        // Prevent dragging if the mousedown event is on a text input or textarea
        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            return;
        }
  
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
  }



function saveDocumentToggle() {
    var table = document.getElementById('save-document-box');
    const tableFilename = document.getElementById('save-filename');

    if (table == null) {
        alert('This function is not defined.');
    }
    else {
        if (table.style.display === 'none') {
            table.style.display = 'grid';
            setFilename(document.getElementById('filename').value);
            tableFilename.value = getFilename();
            console.log(filename);
        }
        else {
            table.style.display = 'none';
        }
    }
}

function saveDocument() {
    const pdfCheckbox = document.getElementById('PDF');
    const wordCheckbox = document.getElementById('wordDoc');
    const tableFilename = document.getElementById('save-filename');
    if (pdfCheckbox.checked) {
        console.log(pdfCheckbox.checked);
        saveAsPDF(tableFilename.value);
    }
    if (wordCheckbox.checked) {
        console.log(wordCheckbox.checked);
        // Have a saveAsWindow thing
        window.print();
    }
}


// TODO: Fix this function.

function saveAsPDF(filename) {
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    const text = document.getElementById('note').innerHTML;
    doc.setFontSize(16);
    doc.text(text, 10, 10);
    doc.save(filename + '.pdf');
}