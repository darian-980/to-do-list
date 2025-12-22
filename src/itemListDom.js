import { format } from "date-fns";

export function constructItemList(projectItem, addNewItem, deleteItem, deleteProject, currentTaskCheck) {

     if (projectItem !== null) {

          const existingList = document.getElementById(`dynamic-item-list`); //grab dynamic item list if it already exists

          existingList?.remove(); // delete item project list if it already exists


          const itemListDiv = document.getElementById(`item-list`);

          const existingButton = document.getElementById(`delete-project-button`);
          existingButton?.remove();

          const deleteProjectButton = document.createElement("div");
          deleteProjectButton.setAttribute("id", "delete-project-button");
          deleteProjectButton.textContent = "Remove Project";
          deleteProjectButton.addEventListener('click', () => {
               deleteProject(projectItem);
               freshItemList();
          }
          );
          itemListDiv.appendChild(deleteProjectButton);

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
     }

     function activeItemSelect(Item, item_task) {

          if (!currentTaskCheck(item_task.getAttribute("id"))) { //checks if the item is currently selected, if it is then don't run code

               document.querySelectorAll('#dynamic-item-list > div').forEach(div => div.classList.remove('activeItem')); //remove "activeItem" class from all projects
               item_task.setAttribute("class", "activeItem"); // add "activeItem" class to provided project

               document.querySelectorAll('.itemExpand').forEach(el => el.remove());
               var itemExpand = document.getElementById(`itemExpand`);
               if (!itemExpand) {
                    itemExpand = document.createElement("div");
                    itemExpand.setAttribute("class", "itemExpand");
               };

               const itemDescription = document.createElement("div");
               itemDescription.textContent = Item.description;
               itemDescription.setAttribute("class", "itemDescription");
               itemExpand.appendChild(itemDescription);

               const itemdueDate = document.createElement("div");
               itemdueDate.textContent = Item.dueDate;
               itemdueDate.setAttribute("class", "itemDueDate");
               itemExpand.appendChild(itemdueDate);

               const itemPriority = document.createElement("div");
               itemPriority.textContent = Item.priority;
               itemPriority.setAttribute("class", "itemPriority");
               itemExpand.appendChild(itemPriority);

               const editTask = document.createElement("div");
               editTask.textContent = "Edit Task";
               editTask.setAttribute("id", "edit-task");
               editTask.addEventListener('click', () => {
                    // editItem(projectItem, Item);
                    editItemMenu(Item, item_task, itemExpand);
                    console.log("edit button clicked")
               }
               );

               const deleteTask = document.createElement("div");
               deleteTask.textContent = "Remove Task";
               deleteTask.setAttribute("id", "delete-task");
               deleteTask.addEventListener('click', () => {
                    deleteItem(projectItem, Item);
               }
               );
               itemExpand.appendChild(editTask);
               itemExpand.appendChild(deleteTask);

               item_task.appendChild(itemExpand);
          }


     };

     function editItemMenu(Item, item_task, itemExpand) {
          var task_name = Item.title;
          var task_description = Item.description;
          var task_due_date = Item.dueDate.toString();
          var task_priority = Item.priority;

          // checkTitleBlank = task_name.replaceAll(' ', ''); // removes blank spaces for checking
          // if (checkTitleBlank === "") {
          //      return; // if the title is blank then don't add the task
          // };

          // if (task_description === null) {
          //      task_description = "";
          // };
          // if (task_due_date === null) {
          //      task_due_date = currentDate();
          // };

          // if (task_priority === null) {
          //      task_priority = "";
          // }

          item_task.childNodes.forEach(node => { //the way to remove an item's text value without affecting the children
               if (node.nodeType === Node.TEXT_NODE) {
                    node.remove();
               }
          });

          itemExpand.innerHTML = ""; //removes the task description elements to make room for the edit elements

          const editTitleArea = document.createElement("input");
          editTitleArea.setAttribute("type", "text");
          editTitleArea.setAttribute("id", "new-item-input");
          editTitleArea.setAttribute("value", task_name);

          const editTaskDescription = document.createElement("input");
          editTaskDescription.setAttribute("id", "new-description-submit");
          editTaskDescription.setAttribute("value", task_description);

          const editTaskDate = document.createElement("input");
          editTaskDate.setAttribute("type", "date");
          editTaskDate.setAttribute("id", "due-date");
          editTaskDate.setAttribute("value", task_due_date);

          ////////

          const editTaskPriority = document.createElement("select");
          editTaskPriority.setAttribute("name", "priority")
          editTaskPriority.setAttribute("id", "task-priority")
          // editTaskPriority.setAttribute("value", task_priority)

          const lowPriority = document.createElement("option");
          lowPriority.textContent = "Low";
          lowPriority.setAttribute("value", "low");

          const mediumPriority = document.createElement("option");
          mediumPriority.textContent = "Medium";
          mediumPriority.setAttribute("value", "medium");

          const highPriority = document.createElement("option");
          highPriority.textContent = "High";
          highPriority.setAttribute("value", "high");

          editTaskPriority.appendChild(lowPriority);
          editTaskPriority.appendChild(mediumPriority);
          editTaskPriority.appendChild(highPriority);

          editTaskPriority.value = task_priority; //sets default (you must do it after appending objects and it has to be set with .value)

          const submitTextButton = document.createElement("div");
          submitTextButton.textContent = "+";
          submitTextButton.setAttribute("id", "new-item-submit");
          submitTextButton.addEventListener('click', () => {
               submitItemButton("edit", Item.id);
          }
          );

          itemExpand.appendChild(editTitleArea);
          itemExpand.appendChild(editTaskDescription);
          itemExpand.appendChild(editTaskDate);
          itemExpand.appendChild(editTaskPriority);
          itemExpand.appendChild(submitTextButton);




     };

     function itemSubmitSection() { // creates the textbox to insert text
          const itemListDynamic = document.getElementById(`dynamic-item-list`);

          document.getElementById(`new-item-button`)?.remove(); //remove new project button so it can be replaced with input

          const newItemDiv = document.createElement("div"); //make an empty div to hold the input AND the button to submit
          newItemDiv.setAttribute("id", "newItemDiv")

          const submitTitleArea = document.createElement("input");
          submitTitleArea.setAttribute("type", "text");
          submitTitleArea.setAttribute("id", "new-item-input");

          const submitTextButton = document.createElement("div");
          submitTextButton.textContent = "+";
          submitTextButton.setAttribute("id", "new-item-submit");
          submitTextButton.addEventListener('click', () => {
               submitItemButton("add", null);
          }
          );

          const newTaskdiv = document.createElement("div");
          newTaskdiv.setAttribute("id", "new-task-div")

          const taskDescription = document.createElement("input");
          taskDescription.setAttribute("id", "new-description-submit");
          taskDescription.setAttribute("placeholder", "Task Description");

          const taskDate = document.createElement("input");
          taskDate.setAttribute("type", "date");
          taskDate.setAttribute("id", "due-date");

          ////////

          const taskPriority = document.createElement("select");
          taskPriority.setAttribute("name", "priority")
          taskPriority.setAttribute("id", "task-priority")

          const lowPriority = document.createElement("option");
          lowPriority.textContent = "Low";
          lowPriority.setAttribute("value", "low");

          const mediumPriority = document.createElement("option");
          mediumPriority.textContent = "Medium";
          mediumPriority.setAttribute("value", "medium");

          const highPriority = document.createElement("option");
          highPriority.textContent = "High";
          highPriority.setAttribute("value", "high");

          taskPriority.appendChild(lowPriority);
          taskPriority.appendChild(mediumPriority);
          taskPriority.appendChild(highPriority);

          newItemDiv.appendChild(submitTitleArea);
          newItemDiv.appendChild(submitTextButton);

          newTaskdiv.appendChild(newItemDiv);
          newTaskdiv.appendChild(taskDescription);
          newTaskdiv.appendChild(taskDate);
          newTaskdiv.appendChild(taskPriority);


          itemListDynamic.prepend(newTaskdiv); // we use .prepend instead of .appendChild so that it doesn't add the textbox last
     };

     function submitItemButton(modifier, itemId) {
          var submitTaskDescription = "";
          var submitTitleValue = "";
          var submitDueDate = "";
          var submitPriority = "low";

          submitTitleValue = document.getElementById(`new-item-input`)?.value;
          submitTaskDescription = document.getElementById(`new-description-submit`)?.value;
          submitDueDate = document.getElementById(`due-date`)?.value;
          submitPriority = document.getElementById(`task-priority`)?.value;

          if (submitDueDate === "") {
               submitDueDate = currentDate();
          }

          const checkTitleBlank = submitTitleValue.replaceAll(' ', ''); // removes blank spaces for checking
          if (checkTitleBlank === "") {
               return; // if the title is blank then don't add the task
          } else {
               addNewItem(submitTitleValue, submitTaskDescription, submitDueDate, submitPriority, projectItem, modifier, itemId);
          }
     }

     function freshItemList() {
          const existingList = document.getElementById(`dynamic-item-list`);
          existingList?.remove();

          const existingButton = document.getElementById(`delete-project-button`);
          existingButton?.remove();
     }
}

export function currentDate() {
     const today = format(new Date(), 'yyyy-MM-dd');
     console.log(today);
     return today;
};

export function formatDate(date) {
     const formattedDate = format(new Date(date), 'yyyy-MM-dd');
     return formattedDate;
}
