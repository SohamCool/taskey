// Parent element to store cards
const taskContainer = document.querySelector(".task__container");

// Global Store
let globalStore = [];
// card 1, card 2, card 3 should store

const newCard = ({id, imageUrl, taskTitle, taskDescription, taskType,}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" id=${id} class="btn btn-outline-success rounded-pill" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" id=${id}></i></button>
        <button type="button" id=${id} class="btn btn-outline-danger rounded-pill" onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" onclick="deleteCard.apply(this, arguments)" id=${id}></i></button>
    </div>
    <div class="card-body">
        <img src=${imageUrl} class="card-img-top" alt="...">
      <h5 class="card-title mt-3">${taskTitle}</h5>
      <p class="card-text">${taskDescription}</p>
      <span class="badge bg-primary">${taskType}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" id=${id} class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
    </div>
  </div>
</div>`;

const loadInitialTaskCards = () => {
    // access localstorage 
    const getInitialData = localStorage.getItem("tasky");
    if(!getInitialData) return;

    //convert stringified object to object
    const {cards} = JSON.parse(getInitialData);

    // map around the array to generate html card inject it to DOM
    cards.map((cardObject) => {
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    });
}

const updateLocalStorage = () => 
localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

const saveChanges = () => {
    const taskData = {
        id: '${Date.now()}',//unique number for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    //html code
    const createNewCard = newCard(taskData);
    
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(taskData);
    updateLocalStorage();
    //parent object browser -> Window
    //parent object html -> DOM -> document
};

const deleteCard = (event) => {
    //id
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;
    //search the global store array, remove the object which matches with the id

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); //those card id's are equal to targetID will get removed
    updateLocalStorage();
    //access DOM to remove them
    if(tagname === "BUTTON"){
        //task-container(for button)
        return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode // col-lg
        );
    }
    //for icon
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode // col-lg
        );
   };

   // Edit card
// contenteditable
const editCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname == "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[3].childNodes[3];
    let taskDescription = parentElement.childNodes[3].childNodes[5];
    let taskType = parentElement.childNodes[3].childNodes[7];
    let submitButton = parentElement.childNodes[5].childNodes[1];

    // serAttribute=->
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEditChanges.apply(this, arguments)");
    submitButton.innerHTML = "Save Changes";
};

const saveEditChanges = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname == "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[3].childNodes[3];
    let taskDescription = parentElement.childNodes[3].childNodes[5];
    let taskType = parentElement.childNodes[3].childNodes[7];
    let submitButton = parentElement.childNodes[5].childNodes[1];

    const updatedData = {
        taskTitle: taskTitle.innerHTML,
        taskType: taskType.innerHTML,
        taskDescription: taskDescription.innerHTML,
    };

    globalStore = globalStore.map((task) => {
        if (task.id === targetID) {
            return {
                id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
            };
        }
        return task;//both returns are imp
    });
    updateLocalStorage();
};
