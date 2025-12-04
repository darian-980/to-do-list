import { constructProjectList } from "./projectListDom.js";
import { constructItemList } from "./itemListDom.js";
import "./styles.css";


class todoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "active";
        this.id = crypto.randomUUID();
    }

    info() {
        return ("[" + this.title + "] [" + this.description + "] [" + this.dueDate + "] [" + this.priority + "] [" + this.status + "] [" + this.id + "]");
    }
}

class projectItem {
    constructor(title) {
        this.title = title;
        this.itemList = [];
        this.id = crypto.randomUUID();
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
    const project2 = new projectItem("Daytime");
    const item1 = new todoItem("floss", "floss teeth", "morning", "medium");
    const item2 = new todoItem("shower", "wash hair", "morning", "high");
    project2.appendItem(item1);
    project2.appendItem(item2);



    const project3 = new projectItem("Evening");
    const item3 = new todoItem("contacts", "swap contacts for new ones", "tonight", "low");
    const item4 = new todoItem("shampoo", "shampoo hair before bed", "tonight", "medium");
    project3.appendItem(item3);
    project3.appendItem(item4);



    console.log("created " + project2.title)
    mainProjectList.appendProject(project2);
    mainProjectList.appendProject(project3);
    constructProjectList(mainProjectList, selectProject, addNewProject);

    constructItemList(project3, addNewItem);
})();


function selectProject(project) { //do something when a project is clicked
    constructItemList(project) // pass selected project into construct item list so it knows which item list to construct
};

function addNewProject(projectName) {
    const newProject = new projectItem(projectName);
    mainProjectList.prependProject(newProject); //prepend adds to top of list
    constructProjectList(mainProjectList, selectProject, addNewProject);
}

function addNewItem(itemName, itemDescription, DueDate, Priority, project) {
    const projectId = project.id;
    const projectIndex = mainProjectList.projectList.findIndex(project => project.id === projectId);
    const addItemNew = new todoItem(itemName, itemDescription, DueDate, Priority);
    mainProjectList.projectList[projectIndex].prependItem(addItemNew);
    constructItemList(project, addNewItem);
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


