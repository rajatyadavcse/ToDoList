// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const baseUrl = "https://todolistappbyrajatyadav.herokuapp.com/WebHost/";
// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  addTasks(userEnteredValue);

  addBtn.classList.remove("active"); //unactive the add button once the task added
}
async function addTasks(userEnteredValue){
  var Url = baseUrl+"todo/task/create/"+userEnteredValue;
  const response = await fetch(Url);
  const listArray = await response.json();
  showTasks();//calling showTask function
}
  async function showTasks(){
  var Url = baseUrl + "todo/task/list";
  const response = await fetch(Url);
  const listArray = await response.json();

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element) => {
    newLiTag += `<li>${element.taskName}<span class="icon" onclick="deleteTask(${element.taskId})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
async function deleteTask(taskId){
  var Url = baseUrl + "todo/task/delete/"+taskId;
  const response = await fetch(Url);
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  deleteAllTask();
}
async function deleteAllTask(){
  var Url = baseUrl +"todo/task/delete";
  const response = await fetch(Url);
  showTasks(); //call the showTasks function
}