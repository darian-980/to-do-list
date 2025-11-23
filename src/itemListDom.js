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
               activeItemSelect(item, item_task);
               console.log("item clicked");
          }
          );

          itemListDynamic.appendChild(item_task); // add project to the dynamic list
     }

     function activeItemSelect(Item, item_task) {
          document.querySelectorAll('#dynamic-item-list > div').forEach(div => div.classList.remove('activeItem')); //remove "activeProject" class from all projects
          item_task.setAttribute("class", "activeItem"); // add "activeItem" class to provided project

          document.querySelectorAll('#itemExpand').forEach(div => div.remove()); //remove all itemExpands
          const itemExpand = document.createElement("div");
          itemExpand.setAttribute("id", "itemExpand");

          const itemDescription = document.createElement("div");
          itemDescription.textContent = Item.description;
          itemDescription.setAttribute("class", "itemDescription");
          itemExpand.appendChild(itemDescription);

          const itemdueDate = document.createElement("div");
          itemdueDate.textContent = Item.dueDate;
          itemdueDate.setAttribute("class", "itemDueDate");
          itemExpand.appendChild(itemdueDate);

          item_task.appendChild(itemExpand);


     };
}

