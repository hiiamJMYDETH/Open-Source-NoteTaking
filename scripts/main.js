// This application/project uses the jsPDF library, which is licensed under the
// MIT License. The licensed text can be found here:
// https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js


let filename = ' ';

function setFilename(name) {
    filename = name;
}

function getFilename() {
    return filename;
}

function handleButtonClick(elementID) {
    if (elementID === 'save-document') {
        loadScript('scripts/save-document.js', function() {
            saveDocumentToggle();
        })
    }
    else {
        alert('Nothing to show here');
    }
}

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    script.onerror = function() {
        console.error('Error loading script', url);
    }
    document.head.appendChild(script);
}