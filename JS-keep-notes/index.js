function getCurrentTime() {
  let today = new Date();
  let time =
    "" +
    today.getDate() +
    (+today.getMonth() + 1) +
    today.getFullYear() +
    today.getHours() +
    today.getMinutes();
  return time;
}

let flag = false;
const description = document.createElement("textarea");
const input = document.getElementById("inputText");
const title = document.getElementById("inp-text");
description.setAttribute("class", "inputs inputText");
description.setAttribute("id", "description");
description.setAttribute("rows", "4");
description.setAttribute("cols", "50");
//close button in add to your list app
const divBox = document.createElement("div");
const closebtn = document.createElement("button");
closebtn.setAttribute("class", "btns ");
closebtn.setAttribute("id", "btns");
closebtn.addEventListener("click", closeInputBox);
closebtn.innerText = "Add to list";

//reminder button
const reminderbtn = document.createElement("select");
reminderbtn.setAttribute("name", "Reminder");

reminderbtn.setAttribute("class", "btns ");
reminderbtn.addEventListener("change", (e) => {
  reminderbtn.value = e.target.value;
  // setTimer(e.target.value);
});

title.addEventListener("click", function () {
  if (!flag) {
    openInputBox();
    flag = true;
  }
});
const items = document.getElementById("items");
let deletedArr = [];
let getArr = [];
// localStorage.setItem("deleted", []);
// fetching the data from local storage after 1st render

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";
}

function openInputBox() {
  (() => {
    title.setAttribute("placeholder", "Title");
    reminderbtn.innerHTML = `
    <option value="Reminder">Reminder</option>
    <option value="After 1 hour">After 1 hour</option>
    <option id="customerDate" value="Select date & time">Select date & time</option>
    `;
    divBox.setAttribute("class", "listBtns");
    document.getElementById("customerDate");
    divBox.appendChild(reminderbtn);
    divBox.appendChild(closebtn);

    title.setAttribute("rows", "1");
    description.setAttribute("placeholder", "Description...");
    input.appendChild(description);

    input.appendChild(divBox);
  })();
}

// }
function closeInputBox() {
  console.log(title);
  description.remove();

  divBox.remove();
  flag = false;
  createObject();
  title.value = "";
  description.value = "";
  title.placeholder = "Add to your List";
}

let reminderArr = [];
if (localStorage.getItem("reminders")) {
  reminderArr = JSON.parse(localStorage.getItem("reminders"));
  // displayItems(getArr);
}
function createObject() {
  const d = new Date();

  const obj = {
    title: title.value,
    description: description.value,
    reminder: reminderbtn.value,
    currTime: getCurrentTime(),
    newTimerId: "",
  };

  if (obj.description.length > 0 || obj.title.length > 0) {
    getArr.push(obj);

    localStorage.setItem("array", JSON.stringify(getArr));
    displayItems(getArr);
    if (obj.reminder == "After 1 hour") {
      setReminder(obj);
    }
  }
}

function setReminder(obj) {
  console.log(obj);
  obj.newTimerId = setTimeout(() => {
    console.log("hi");
    alert(obj.title);
    const audio = new Audio(url);
    audio.play();
    obj.newTimerId = "";
    localStorage.setItem("reminders", JSON.stringify(reminderArr));
  }, 1000 * 60 * 60);
  reminderArr.push(obj);
  localStorage.setItem("reminders", JSON.stringify(reminderArr));
}

function displayItems(setItems) {
  items.innerHTML = "";

  setItems.forEach((item, idx) => {
    const card = document.createElement("div");
    card.setAttribute("class", " card col-lg-3 col-md-4 col-sm-6");
    const divInside = document.createElement("div");
    divInside.setAttribute("class", "insideBtns");
    card.setAttribute("style", "width: 18rem;");

    card.innerHTML = `<div class="card-body" id="card-body${idx}">
    <h5 class="card-title${idx} card-title card-font">${item.title}</h5>
    <p class="card-text${idx} card-text-font">${item.description}</p>
    
  </div>`;
    if (item.reminder == "After 1 hour") {
      const reminderSticker = document.createElement("div");
      reminderSticker.setAttribute("class", "sticker");
      reminderSticker.innerText = "Reminder";
      card.append(reminderSticker);
    }

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = `<img class="editBtn" src="https://cdn-icons-png.flaticon.com/128/484/484611.png"/>`;
    deletebtn.setAttribute("class", "btns");
    deletebtn.addEventListener("click", () => {
      deleteItem(idx, setItems);
    });

    const editbtn = document.createElement("button");
    editbtn.setAttribute("class", "btns");

    editbtn.innerHTML = `<img class="editBtn" src="https://cdn-icons-png.flaticon.com/128/84/84380.png"/>`;
    editbtn.addEventListener("click", () => {
      editItem(idx, setItems);
    });

    divInside.appendChild(deletebtn);
    divInside.appendChild(editbtn);

    card.appendChild(divInside);
    // card.appendChild(editbtn);
    items.appendChild(card);
  });
}

function deleteItem(idx, arr) {
  let deletedItem = arr.splice(idx, 1);
  console.log(...deletedItem);
  deletedArr.push(...deletedItem);
  localStorage.setItem("deleted", JSON.stringify(deletedArr));
  getArr.forEach((item, id) => {
    if (item.title === deletedItem[0].title) {
      getArr.splice(id, 1);
    }
  });
  localStorage.setItem("array", JSON.stringify(arr));
  displayItems(arr);
  reminderArr.forEach((item, id) => {
    if (item.title === deletedItem[0].title) {
      console.log(item);
      reminderArr.splice(id, 1);
      clearTimeout(item.newTimerId);
    }
  });
  localStorage.setItem("reminders", JSON.stringify(reminderArr));
}

function editItem(idx, setItems) {
  const editItemDiv = document.getElementById(`card-body${idx}`);

  //fetch the card title details

  const cardTitle = document.querySelector(`.card-title${idx}`);
  const cardTitleValue = cardTitle.textContent;

  const newTitle = document.createElement("input");
  newTitle.value = cardTitleValue;
  newTitle.setAttribute("id", "editedTitle");
  newTitle.setAttribute("class", "editarea editTitleDiv");
  ////fetch the card desc details
  const cardText = document.querySelector(`.card-text${idx}`);
  const cardTextValue = cardText.textContent;
  const newDescription = document.createElement("textarea");
  newDescription.setAttribute("row", 1);
  newDescription.value = cardTextValue;
  newDescription.setAttribute("id", "editedDesc");
  newDescription.setAttribute("class", "editarea");
  const saveDiv = document.createElement("div");
  saveDiv.setAttribute("class", "saveDiv");
  const savebtn = document.createElement("button");
  savebtn.innerHTML = `<img class="editBtn" src="https://cdn-icons-png.flaticon.com/128/102/102279.png"/>`;
  saveDiv.appendChild(savebtn);
  editItemDiv.innerHTML = "";
  //appending all the newly created items'
  editItemDiv.appendChild(newTitle);
  editItemDiv.append(newDescription);
  editItemDiv.appendChild(saveDiv);

  //event listener for save button and calling display items fn to re render
  savebtn.addEventListener("click", () => {
    setItems[idx].title = newTitle.value;
    setItems[idx].description = newDescription.value;
    localStorage.setItem("array", JSON.stringify(getArr));
    displayItems(setItems);
  });
}

const searchInp = document.getElementById("search-inp");

searchInp.addEventListener("keyup", (event) => {
  let timerId;

  timerId = setTimeout(() => {
    searchItems(event.target.value);
  }, 500);
});
function searchItems(str) {
  let searchArr = [];

  getArr.forEach((item) => {
    if (item.title.includes(str)) {
      searchArr.push(item);
    }
  });

  displayItems(searchArr);
}

function init() {
  if (localStorage.getItem("array")) {
    getArr = JSON.parse(localStorage.getItem("array"));
    displayItems(getArr);
  }

  if (localStorage.getItem("deleted")) {
    deletedArr = JSON.parse(localStorage.getItem("deleted"));
  } else {
    deletedArr = [];
  }

  for (let i = 0; i < reminderArr.length; i++) {
    if (reminderArr[i].newTimerId != "") {
      reminderArr[i].newTimerId = setTimeout(() => {
        alert(reminderArr[i].title);
        reminderArr[i].newTimerId = "";
        localStorage.setItem("reminders", JSON.stringify(reminderArr));
      }, time - reminderArr[i].currTime);
    }
    console.log(+getCurrentTime() - +reminderArr[i].currTime);
  }
}
init();
