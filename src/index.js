import { constructProjectList } from "./projectListDom.js";
import { constructItemList } from "./itemListDom.js";
import { currentDate } from "./itemListDom.js";
import { formatDate } from "./itemListDom.js";
import { storageAvailable } from "./localstorage_check.js"
import "./styles.css";


class todoItem {
    constructor(title, description, dueDate, priority, id = null) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "active";

        if (id === null) {
            this.id = crypto.randomUUID();
        } else {
            this.id = id;
        }

    }

    info() {
        return ("[" + this.title + "] [" + this.description + "] [" + this.dueDate + "] [" + this.priority + "] [" + this.status + "] [" + this.id + "]");
    }
}

class projectItem {
    constructor(title, id = null) {
        this.title = title;
        this.itemList = [];

        if (id === null) {
            this.id = crypto.randomUUID();
        } else {
            this.id = id;
        }
    }

    appendItem(task) {
        this.itemList.push(task);
    }

    prependItem(task) {
        this.itemList.unshift(task);
    }

    removeItem(id) {
        const index = this.itemList.findIndex(item => item.id === id); //find array item with matching id
        const itemName = this.itemList[index].title; //grab name of task to be removed (for documentation only)
        const removeTask = this.itemList.splice(index, 1); //remove 1 item at specified index
        console.log("removed '" + itemName + "' task from '" + this.title + "' project");
    }

    listInfo() {
        return (this.itemList.map(item => item.title)); //uses .map to grab the title value from every task item
    }
}

class projectList {
    constructor() {
        this.projectList = [];
        this.id = crypto.randomUUID(); // probably not needed
    }

    appendProject(project) {
        this.projectList.push(project);
    }

    prependProject(project) {
        this.projectList.unshift(project);
    }

    removeProject(id) {
        const index = this.projectList.findIndex(project => project.id === id); //find array item with matching id
        const removeProject = this.projectList.splice(index, 1); //remove 1 item at specified index
    }
}

const mainProjectList = new projectList(); // the one and only project list to be used globally

(function () {


    if (localStorage.getItem("mainProjectList") === null) { //loads default items if there is no mainProjectList in the localStorage
        addDefaultItems();
    } else {
        unpackLocalStorage();
    }

    constructProjectList(mainProjectList, selectProject, addNewProject);


})();

function addDefaultItems() {
    const project2 = new projectItem("Daytime");
    const item1 = new todoItem("floss", "floss teeth", currentDate(), "medium");
    const item2 = new todoItem("shower", "wash hair", currentDate(), "high");
    project2.appendItem(item1);
    project2.appendItem(item2);



    const project3 = new projectItem("Evening");
    const item3 = new todoItem("contacts", "swap contacts for new ones", currentDate(), "low");
    const item4 = new todoItem("shampoo", "shampoo hair before bed", currentDate(), "medium");
    project3.appendItem(item3);
    project3.appendItem(item4);



    console.log("created " + project2.title)
    mainProjectList.appendProject(project2);
    mainProjectList.appendProject(project3);

    if (storageAvailable("localStorage")) {
        console.log("storage is available");
        const mainProjectListJSON = JSON.stringify(mainProjectList);
        localStorage.setItem("mainProjectList", mainProjectListJSON);
    }

};

function unpackLocalStorage() {
    const mainProjectListJSON = localStorage.getItem("mainProjectList");
    const mainProjectListParsed = JSON.parse(mainProjectListJSON);
    const projectListArray = mainProjectListParsed.projectList;

    let i = 0;
    while (i < projectListArray.length) {
        const projectTitle = projectListArray[i].title;
        const projectID = projectListArray[i].id;
        const addProject = new projectItem(projectTitle, projectID);
        // console.log(projectListArray);

        let k = 0;
        while (k < projectListArray[i].itemList.length) {
            const itemTitle = projectListArray[i].itemList[k].title;
            const itemDescription = projectListArray[i].itemList[k].description;
            const itemdueDate = projectListArray[i].itemList[k].dueDate;
            const convDate = formatDate(itemdueDate);
            const itemPriority = projectListArray[i].itemList[k].priority;
            const itemStatus = projectListArray[i].itemList[k].status;
            const itemID = projectListArray[i].itemList[k].id;

            const addItem = new todoItem(itemTitle, itemDescription, convDate, itemPriority, itemID);
            addProject.appendItem(addItem);
            console.log(addItem);
            k++;
        };

        mainProjectList.appendProject(addProject);
        i++;
    }
}


function selectProject(project) { //do something when a project is clicked
    constructItemList(project, addNewItem, deleteItem, deleteProject) // pass selected project into construct item list so it knows which item list to construct
};

function addNewProject(projectName) {
    const itemID = crypto.randomUUID(); //create the ID here so it can easily be passed to localStorage
    const newProject = new projectItem(projectName, itemID);
    mainProjectList.prependProject(newProject); //prepend adds to top of list
    constructProjectList(mainProjectList, selectProject, addNewProject);
    selectProject(newProject);

    if (storageAvailable("localStorage")) {
        const mainProjectListJSON = localStorage.getItem("mainProjectList");
        const mainProjectListParsed = JSON.parse(mainProjectListJSON);

        mainProjectListParsed.projectList.unshift(newProject);

        const mainProjectListConverted = JSON.stringify(mainProjectListParsed);
        localStorage.setItem("mainProjectList", mainProjectListConverted);
    }
};

function addNewItem(itemName, itemDescription, DueDate, Priority, project) {
    const projectId = project.id;
    const projectIndex = mainProjectList.projectList.findIndex(project => project.id === projectId);
    const itemID = crypto.randomUUID(); //create the ID here so it can easily be passed to localStorage
    const addItemNew = new todoItem(itemName, itemDescription, DueDate, Priority, itemID);
    mainProjectList.projectList[projectIndex].prependItem(addItemNew);
    constructItemList(project, addNewItem, deleteItem, deleteProject);


    if (storageAvailable("localStorage")) {
        const mainProjectListJSON = localStorage.getItem("mainProjectList");
        const mainProjectListParsed = JSON.parse(mainProjectListJSON);

        const ProjectIndex = mainProjectListParsed.projectList.findIndex(project => project.id === projectId);
        mainProjectListParsed.projectList[ProjectIndex].itemList.unshift(addItemNew);

        const mainProjectListConverted = JSON.stringify(mainProjectListParsed);
        localStorage.setItem("mainProjectList", mainProjectListConverted);
    }
};

function deleteItem(project, item) {
    const itemId = item.id;
    const projectId = project.id;
    const itemIndex = project.itemList.findIndex(item => item.id === itemId);
    project.itemList.splice(itemIndex, 1);
    selectProject(project);

    if (storageAvailable("localStorage")) {
        const mainProjectListJSON = localStorage.getItem("mainProjectList");
        const mainProjectListParsed = JSON.parse(mainProjectListJSON);

        const ProjectIndex = mainProjectListParsed.projectList.findIndex(project => project.id === projectId);
        const ItemIndex = mainProjectListParsed.projectList[ProjectIndex].itemList.findIndex(item => item.id === itemId);
        mainProjectListParsed.projectList[ProjectIndex].itemList.splice(ItemIndex, 1);

        const mainProjectListConverted = JSON.stringify(mainProjectListParsed);
        localStorage.setItem("mainProjectList", mainProjectListConverted);
    }
};

function deleteProject(project) {
    const projectId = project.id;
    console.log(projectId);
    const projectIndex = mainProjectList.projectList.findIndex(project => project.id === projectId);
    console.log(projectIndex + " index");
    mainProjectList.projectList.splice(projectIndex, 1);
    constructProjectList(mainProjectList, selectProject, addNewProject);

    if (storageAvailable("localStorage")) {
        const mainProjectListJSON = localStorage.getItem("mainProjectList");
        const mainProjectListParsed = JSON.parse(mainProjectListJSON);

        const ProjectIndex = mainProjectListParsed.projectList.findIndex(project => project.id === projectId);
        mainProjectListParsed.projectList.splice(ProjectIndex, 1);

        const mainProjectListConverted = JSON.stringify(mainProjectListParsed);
        localStorage.setItem("mainProjectList", mainProjectListConverted);
    }
}

// export default mainProjectList;

// const item1 = new todoItem("floss", "floss teeth", "tonight", "medium");
// const item2 = new todoItem("shower", "wash hair", "tonight", "high");
// const item3 = new todoItem("contacts", "swap contacts for new ones", "morning", "low");
// console.log(item1.info());
// console.log(item2.info());
// console.log(item3.info());

// const project1 = new projectItem("nighttime");
// project1.appendItem(item1);
// project1.appendItem(item2);
// project1.appendItem(item3);
// console.log(project1.listInfo());
// project1.removeItem(item2.id);
// console.log(project1.listInfo());


