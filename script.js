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
    }

    appendItem(task) {
        this.itemList.push(task);
    }

    removeItem(id) {
        const index = this.itemList.findIndex(item => item.id === id); //find array item with matching id
        const itemName = this.itemList[index].title; //grab name of task to be removed (for documentation only)
        const removeTask = this.itemList.splice(index, 1); //remove 1 item at specified index
        console.log("removed '" + itemName + "' task from project.")
    }

    listInfo() {
        return (this.itemList.map(item => item.title)); //uses .map to grab the title value from every task item
    }
}



const item1 = new todoItem("floss", "floss teeth", "tonight", "medium");
const item2 = new todoItem("shower", "wash hair", "tonight", "high");
console.log(item1.info());
console.log(item2.info());

const project1 = new projectItem("nighttime");
project1.appendItem(item1);
project1.appendItem(item2);
console.log(project1.listInfo());
project1.removeItem(item1.id);
console.log(project1.listInfo());


