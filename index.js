
showNotes(); //to display notes after refresh 

// To add a note to local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';      //to clear input area after adding note
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" noteCard card  my-2 mx-2" style="width: 18rem; box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);">
        <div class="card-body">
            <h5 class="card-title border border-1  rounded py-2 px-2">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger"> Delete Note</button>
        </div>
        </div>
        `
    });

    let notesElm = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'No Notes To Show';
    }
}

// function to delete note

function deleteNote(index) {
    // console.log("i am deleting",index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if(confirm("Are you sure??") == true){
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    }
}

// search button functionality

let search = document.getElementById('searchTxt');

search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});