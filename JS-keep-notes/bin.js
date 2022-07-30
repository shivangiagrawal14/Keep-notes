function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";
}

let itemsArr = JSON.parse(localStorage.getItem("deleted"));
const items = document.getElementById("items");
console.log(itemsArr.length);
function init() {
  if (itemsArr.length > 0) {
    displayItems(itemsArr);
  } else {
    const trash = document.createElement("div");
    trash.setAttribute("class", "bin");
    trash.innerHTML = `
      
      <h1 class="trashIcon"> 🗑️ </h1>
    
        `;
    items.appendChild(trash);
  }
}

init();

// displayItems(itemsArr);
function displayItems(setItems) {
  items.innerHTML = "";

  setItems.forEach((item, idx) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card card col-lg-3 col-md-4 col-sm-6");
    card.setAttribute("style", "width: 18rem;");
    const divInside = document.createElement("div");
    divInside.setAttribute("class", "insideBtns");
    card.innerHTML = `<div class="card-body" id="card-body${idx}">
      <h5 class="card-title${idx}">${item.title}</h5>
      <p class="card-text${idx}">${item.description}</p>
      
    </div>`;
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = `<img class="editBtn" src="https://cdn-icons-png.flaticon.com/128/484/484611.png"/>`;
    deletebtn.setAttribute("class", "btns");
    deletebtn.addEventListener("click", () => {
      deleteItem(idx, setItems);
    });
    divInside.appendChild(deletebtn);
    card.append(divInside);
    items.appendChild(card);
  });
}

function deleteItem(idx, arr) {
  let deletedItem = arr.splice(idx, 1);

  itemsArr.forEach((item, id) => {
    if (item.title === deletedItem[0].title) {
      itemsArr.splice(id, 1);
    }
  });
  localStorage.setItem("deleted", JSON.stringify(itemsArr));
  displayItems(itemsArr);
  init();
}
