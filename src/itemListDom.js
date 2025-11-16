export function constructItemList(projectItem) {

     const existingList = document.getElementById(`dynamic-item-list`); //grab dynamic item list if it already exists

     existingList?.remove(); // delete item project list if it already exists


     const itemListDiv = document.getElementById(`item-list`);

     const itemListDynamic = document.createElement("div"); // make a new element that we can delete at any time to recreate/refresh a new list
     itemListDynamic.setAttribute("id", "dynamic-item-list");
     itemListDiv.appendChild(itemListDynamic);

     for (const item of projectItem.itemList) {
          // console.log("item " + item.title)
          const item_task = document.createElement("div");
          item_task.setAttribute("id", item.id); // add the id to the element so that it can be referenced
          item_task.textContent = item.title; // set project title
          item_task.addEventListener('click', () => { 
               // onProjectClick(item);
               // activeProjectSelect(projectItem);
               console.log("item clicked");
               }
          );

          itemListDynamic.appendChild(item_task); // add project to the dynamic list
     }
}

function activeProjectSelect(projectItem) {
     document.querySelectorAll('#dynamic-project-list > div').forEach(div => div.classList.remove('activeProject')); //remove "activeProject" class from all projects
     projectItem.setAttribute("class", "activeProject"); // add "activeProject" class to provided project
};