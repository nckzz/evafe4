document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form_notas");
    const notesContainer = document.getElementById("notes-container");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const importantInput = document.getElementById("important");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const important = importantInput.checked;

        if (description === "") {
            alert("La descripción es obligatoria");
            return;
        }

        const note = {
            id: Date.now(),
            title,
            description,
            important
        };

        addNoteToDOM(note);
        saveNoteToLocalStorage(note);

        form.reset();
    });

    function addNoteToDOM(note) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        if (note.important) {
            noteElement.classList.add("important");
        }

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        `;

        notesContainer.appendChild(noteElement);
    }

    function saveNoteToLocalStorage(note) {
        const notes = getNotesFromLocalStorage();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function getNotesFromLocalStorage() {
        const notes = localStorage.getItem("notes");
        return notes ? JSON.parse(notes) : [];
    }

    function loadNotes() {
        const notes = getNotesFromLocalStorage();
        notes.forEach(note => addNoteToDOM(note));
    }

    loadNotes();
});
