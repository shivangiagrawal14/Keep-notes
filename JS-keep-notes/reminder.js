function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";
}

let itemsArr = JSON.parse(localStorage.getItem("reminders"));
const items = document.getElementById("items");
if (localStorage.getItem("reminders")) {
  console.log(itemsArr);
  displayItems(itemsArr);
}

console.log(itemsArr);
// else {
//   const trash = document.createElement("div");
//   trash.setAttribute("class", "bin");
//   trash.innerHTML = `

//     <h1 class="trashIcon"> 🗑️ </h1>

//       `;
//   items.appendChild(trash);
// }

// displayItems(itemsArr);
function displayItems(setItems) {
  console.log(setItems);
  items.innerHTML = "";

  setItems.forEach((item, idx) => {
    console.log(item);
    const card = document.createElement("div");
    card.setAttribute("class", "card card col-lg-3 col-md-4 col-sm-6");
    card.setAttribute("style", "width: 18rem;");
    card.innerHTML = `<div class="card-body" id="card-body${idx}">
      <h5 class="card-title${idx}">${item.title}</h5>
      <p class="card-text${idx}">${item.description}</p>
      
    </div>`;

    items.appendChild(card);
  });
}
