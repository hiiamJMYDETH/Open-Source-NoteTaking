// GOAL: Make a notes app that draws using the mouse, works like a Word Document
// and that's it. 

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
    console.log(filename);

    if (table == null) {
        alert('This function is not defined.');
    }
    else {
        if (table.style.display === 'none') {
            table.style.display = 'grid';
            setFilename(document.getElementById('filename').value);
        }
        else {
            table.style.display = 'none';
            setFilename(document.getElementById('filename').value);
        }
    }
}

function saveDocument() {
    ;
}

function saveAsPDF() {
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    const text = document.getElementById('note').value;
    doc.setFontSize(16);
    doc.text(text, 10, 10);
    doc.save('note.pdf');
}