let count = 0;
const addBtn = document.getElementById('new-note');
const deleteAllNotesBtn = document.getElementById('delete-all-notes');
const saveAllNotesBtn = document.getElementById('save-notes');
const aboutBtn = document.getElementById('about');

addBtn.addEventListener('click', function() {
    addNote();
})

deleteAllNotesBtn.addEventListener('click', function() {
    const noteContainer = document.getElementById('notes-div');
    for (let i = 0; i < count; i++) {
        const currNote = document.getElementById(`note-${i}`);
        currNote.remove();
    }
    count = 0;
})

saveAllNotesBtn.addEventListener('click', function() {
    saveNotes();
})

aboutBtn.addEventListener('click', function() {
    window.open('about.html', '_blank')
})

function saveNotes() {
    const notes = document.querySelectorAll('.note-box .content');
    const titles = document.querySelectorAll('.note-box .title');
    const data = [];
    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        if (content.trim() != "") {
            data.push({title, content});
        }
    });

    const titlesData = data.map((item) => item.title);
    console.log('data:' + titlesData);
    localStorage.setItem(
        "titles", JSON.stringify(titlesData)
    );
    const contentData = data.map((item) => item.content);
    localStorage.setItem(
        "notes", JSON.stringify(contentData)
    );
}

const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    const noteContainer = document.getElementById('note-div');
    note.classList.add("note-box");
    note.id = `note-${count}`;
    note.innerHTML = `
                <div class="icons">
                    <button class="button save-note" data-note-id="${count}">Save note</button>
                    <button class="button delete-note" data-note-id="${count}">Delete note</button>
                    <button class="button change-font-type" data-note-id="${count}">Change font type</button>
                    <button class="button enable-bullet-points" data-note-id="${count}">Enable bulletpoints</button>
                </div>
                <div class="title-div-note">
                    <textarea class="title" placeholder="Write the title here...">${title}</textarea>
                </div>
                <textarea class="content" placeholder="Write your thoughts here...">${text}</textarea>
            `;

    noteContainer.appendChild(note);
    dragElement(note);
    console.log(`Note created: #note-${count}`);
    count++;

    // Event delegation: Handle clicks on buttons inside notes using data attributes
    noteContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-note')) {
            const noteId = event.target.getAttribute('data-note-id');
            const currentNote = document.getElementById(`note-${noteId}`);
            if (currentNote) {
                currentNote.remove();
                console.log(`Deleted note: #note-${noteId}`);
                count--;
                saveNotes();
            }
        }
        else if (event.target.classList.contains('save-note')) {
            saveNotes();
            console.log('Note saved');
        }
        else if (event.target.classList.contains('change-font-type')) {
            alert('Change font type');
        }
        else if (event.target.classList.contains('enable-bullet-points')) {
            alert('Enable bulletpoints');
        }
    });
};


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

function loadNotes() {
    const titlesData = JSON.parse(localStorage.getItem("titles")) || [];
    const contentData = JSON.parse(localStorage.getItem("notes")) || [];

    for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
        addNote(titlesData[i], contentData[i]);
    }
}

loadNotes();