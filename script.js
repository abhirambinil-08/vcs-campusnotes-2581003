const subjectInput = document.getElementById("subject");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addButton = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

const storageKey = "campusNotes";
let notes = [];

function loadNotes() {
    try {
        const storedNotes = localStorage.getItem(storageKey);
        const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
        notes = Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch (error) {
        console.warn("Unable to load notes from local storage:", error);
        notes = [];
    }
}

function saveNotes() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (error) {
        console.warn("Unable to save notes to local storage:", error);
    }
}

function displayNotes() {
    if (!notesList) {
        return;
    }

    notesList.innerHTML = "";

    if (notes.length === 0) {
        notesList.innerHTML = '<p class="empty-message">No notes available yet.</p>';
        return;
    }

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note-card";

        const subject = document.createElement("strong");
        subject.textContent = note.subject;

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = note.content;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        });

        card.append(subject, heading, paragraph, deleteButton);
        notesList.appendChild(card);
    });
}

if (addButton && subjectInput && titleInput && contentInput) {
    addButton.addEventListener("click", () => {
        const subject = subjectInput.value.trim();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!subject || !title || !content) {
            alert("Please fill in all fields.");
            return;
        }

        notes.push({ subject, title, content });

        saveNotes();
        displayNotes();

        subjectInput.value = "";
        titleInput.value = "";
        contentInput.value = "";
    });
}

loadNotes();
displayNotes();
