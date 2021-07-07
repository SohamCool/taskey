// Parent element to store cards
const taskContainer = document.querySelector(".task__container");

// Global Store
const globalStore = [];
// card 1, card 2, card 3 should store

const newCard = ({id, imageUrl, taskTitle, taskDescription, taskType,}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success rounded-pill"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger rounded-pill"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="card-body">
        <img src=${imageUrl} class="card-img-top" alt="...">
      <h5 class="card-title mt-3">${taskTitle}</h5>
      <p class="card-text">${taskDescription}</p>
      <span class="badge bg-primary">${taskType}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
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
    cards.map
    ((cardObject)=>{
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    });
}

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
    
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
    //parent object browser -> Window
    //parent object html -> DOM -> document
};