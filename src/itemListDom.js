export function constructItemList(projectItem, addNewItem) {

     const existingList = document.getElementById(`dynamic-item-list`); //grab dynamic item list if it already exists

     existingList?.remove(); // delete item project list if it already exists


     const itemListDiv = document.getElementById(`item-list`);

     const itemListDynamic = document.createElement("div"); // make a new element that we can delete at any time to recreate/refresh a new list
     itemListDynamic.setAttribute("id", "dynamic-item-list");
     itemListDiv.appendChild(itemListDynamic);

     const newItemButton = document.createElement("div");
     newItemButton.setAttribute("id", "new-item-button");
     newItemButton.textContent = "+ New Task";
     newItemButton.addEventListener('click', () => {
          // addNewProject();
          itemSubmitSection();
          console.log("new item button clicked");
     }
     );
     itemListDynamic.appendChild(newItemButton);

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

     function itemSubmitSection() { // creates the textbox to insert text
          const itemListDynamic = document.getElementById(`dynamic-item-list`);

          document.getElementById(`new-item-button`)?.remove(); //remove new project button so it can be replaced with input

          const newItemDiv = document.createElement("div"); //make an empty div to hold the input AND the button to submit
          newItemDiv.setAttribute("id", "newItemDiv")

          const submitTextArea = document.createElement("input");
          submitTextArea.setAttribute("type", "text");
          submitTextArea.setAttribute("id", "new-item-input");

          const submitTextButton = document.createElement("div");
          submitTextButton.textContent = "+";
          submitTextButton.setAttribute("id", "new-item-submit");
          submitTextButton.addEventListener('click', () => {
               submitItemButton();
          }
          );

          newItemDiv.appendChild(submitTextArea);
          newItemDiv.appendChild(submitTextButton);


          itemListDynamic.prepend(newItemDiv); // we use .prepend instead of .appendChild so that it doesn't add the textbox last
     };

     function submitItemButton() {
          const submitTextArea = document.getElementById(`new-item-input`);
          const submitTextValue = submitTextArea.value;
          console.log(submitTextValue);
          addNewItem(submitTextValue, projectItem);
     }
}

