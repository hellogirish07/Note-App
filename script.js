const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const showFormButton = document.getElementById('showFormButton'); // Button to show the form
const inputBox = document.getElementById('input-box'); // Form container
const searchTitle = document.getElementById('searchTitle');
let editIndex = null;

showNotes();

// Show the form when "Add Note" button is clicked
showFormButton.addEventListener('click', () => {
    inputBox.style.display = 'block'; // Show the form
    showFormButton.style.display = 'none'; // Hide the "Add Note" button
});

function addNotes() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    if (addText.value === '') {
        alert('Please enter the required data for add a new note');
        return;
    }

    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    };

    if (editIndex === null) {
        // Add new note
        notes.push(noteObj);
    } else {
        // Update existing note
        notes[editIndex] = noteObj;
        editIndex = null; // Reset edit index after update
    }

    addTitle.value = '';
    addText.value = '';
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes(); // Reset the displayed notes

    // Hide the form and show "Add Note" button again
    inputBox.style.display = 'none';
    showFormButton.style.display = 'block';
    addNoteButton.textContent = 'Add'; // Reset button text
}

function showNotes(filter = '') {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    
    for (let i = 0; i < notes.length; i++) {
        // Only show notes that include the filter in their title
        if (notes[i].title.toLowerCase().includes(filter.toLowerCase())) {
            notesHTML += `
                <div class="note">
                    <span class="title"><strong style="font-size: 20px;">${notes[i].title === "" ? 'Note' : notes[i].title}</strong></span>
                    <div class="text">${notes[i].text}</div><br>
                    <button class="editNote" onclick="editNote(${i})">Edit</button>
                    <button class="deleteNote" onclick="deleteNote(${i})">Delete</button>
                </div>
            `;
        }
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function editNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }

    addTitle.value = notes[ind].title;
    addText.value = notes[ind].text;
    editIndex = ind;

    inputBox.style.display = 'block';
    showFormButton.style.display = 'none';
    addNoteButton.textContent = "Update Note";
}

addNoteButton.addEventListener('click', addNotes);

// Add event listener to search input
searchTitle.addEventListener('input', (e) => {
    const filter = e.target.value;
    showNotes(filter);
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}
