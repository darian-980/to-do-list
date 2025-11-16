export function constructProjectList(mainProjectList, onProjectClick) {

     const existingList = document.getElementById(`dynamic-project-list`); //grab dynamic project list if it already exists

     existingList?.remove(); // delete dynamic project list if it already exists


     const projectListDiv = document.getElementById(`project-list`);

     const projectListDynamic = document.createElement("div"); // make a new element that we can delete at any time to recreate/refresh a new list
     projectListDynamic.setAttribute("id", "dynamic-project-list");
     projectListDiv.appendChild(projectListDynamic);

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
     }
}

function activeProjectSelect(projectItem) {
     document.querySelectorAll('#dynamic-project-list > div').forEach(div => div.classList.remove('activeProject')); //remove "activeProject" class from all projects
     projectItem.setAttribute("class", "activeProject"); // add "activeProject" class to provided project
};