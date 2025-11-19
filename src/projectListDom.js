export function constructProjectList(mainProjectList, onProjectClick, addNewProject) {

     const existingList = document.getElementById(`dynamic-project-list`); //grab dynamic project list if it already exists

     existingList?.remove(); // delete dynamic project list if it already exists


     const projectListDiv = document.getElementById(`project-list`);

     const projectListDynamic = document.createElement("div"); // make a new element that we can delete at any time to recreate/refresh a new list
     projectListDynamic.setAttribute("id", "dynamic-project-list");
     projectListDiv.appendChild(projectListDynamic);

     const newProjectButton = document.createElement("div");
     newProjectButton.setAttribute("id", "new-project-button");
     newProjectButton.textContent = "+ New Project";
     newProjectButton.addEventListener('click', () => {
          // addNewProject();
          projectSubmitSection();
          console.log("new project button clicked");
     }
     );
     projectListDynamic.appendChild(newProjectButton);


     for (const project of mainProjectList.projectList) {
          console.log(project)
          const projectItem = document.createElement("div");
          projectItem.setAttribute("id", project.id); // add the id to the element so that it can be referenced
          projectItem.textContent = project.title; // set project title
          projectItem.addEventListener('click', () => {
               onProjectClick(project);
               activeProjectSelect(projectItem);
               console.log("project clicked");
          }
          );

          projectListDynamic.appendChild(projectItem); // add project to the dynamic list
     };

     function activeProjectSelect(projectItem) {
          document.querySelectorAll('#dynamic-project-list > div').forEach(div => div.classList.remove('activeProject')); //remove "activeProject" class from all projects
          projectItem.setAttribute("class", "activeProject"); // add "activeProject" class to provided project
     };

     function projectSubmitSection() { // creates the textbox to insert text
          const projectListDynamic = document.getElementById(`dynamic-project-list`);

          document.getElementById(`new-project-button`)?.remove(); //remove new project button so it can be replaced with input

          const newProjectDiv = document.createElement("div"); //make an empty div to hold the input AND the button to submit
          newProjectDiv.setAttribute("id", "newProjectDiv")

          const submitTextArea = document.createElement("input");
          submitTextArea.setAttribute("type", "text");
          submitTextArea.setAttribute("id", "new-project-input");

          const submitTextButton = document.createElement("div");
          submitTextButton.textContent = "+";
          submitTextButton.setAttribute("id", "new-project-submit");
          submitTextButton.addEventListener('click', () => {
               submitProjectButton();
          }
          );

          newProjectDiv.appendChild(submitTextArea);
          newProjectDiv.appendChild(submitTextButton);


          projectListDynamic.prepend(newProjectDiv); // we use .prepend instead of .appendChild so that it doesn't add the textbox last
     }

     function submitProjectButton() {
          const submitTextArea = document.getElementById(`new-project-input`);
          const submitTextValue = submitTextArea.value;
          console.log(submitTextValue);
          addNewProject(submitTextValue);
     }
}





