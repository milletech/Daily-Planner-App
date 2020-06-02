// Data Controller Module


var dataController = (function() {
    // create an item using the constructor function
    var todoItem = function(inputText, id) {
        this.inputText = inputText;
        this.id = id;
    };

    var completedToDo = function(inputText, id) {
        this.inputText = inputText;
        this.id = id;
    }

    // Data structure
    var data = {
        todolist: [],
        completed: []
    };

    return {
        createItem: function(input) {
            var newItem, ID;
            // Create a unique  ID for each Item
            // Find the id of last item in the array and add 1


            if (data.todolist.length > 0) {
                ID = data.todolist[data.todolist.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create a new item
            newItem = new todoItem(input, ID);
            // Push the new item to the database
            data.todolist.push(newItem);
            console.log(data)
            return newItem;
        },

        comItem: function(input) {
            var newItem, ID;
            // Create a new unique id
            if (data.completed.length > 0) {
                ID = data.completed[data.completed.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create a new item
            newItem = new completedToDo(input, ID);
            // Push the newitem to the database
            data.completed.push(newItem);
            console.log(data);

            return newItem;

        },

        deleteItem: function(id) {
            var ids, index;
            // Get all the ids, by looping every elemnt in the array and return the each id of it
            ids = data.todolist.map(function(current) {
                return current.id;
            });
            // Search the current id from all of them
            index = ids.indexOf(id);

            // if the index is found, index will be -1 if the id is not found
            if (index !== -1) {
                // remove the item from the data structure
                data.todolist.splice(index, 1);
                // Remove element in the array at the index of index and remove only 1 element
            }
            console.log(data);
        },
    }

})();

// UI Controller module

var UIController = (function() {

    var DOMstrings = {
        inputText: ".input-text",
        pen: ".write-btn",
        todolistContainer: ".list-container",
        greeting: ".greeting",
        time: ".time",
        hoursLeft: ".hours-left",
        listContainer: ".list-container",
        compListContainer: ".list-container-complete"
    }


    return {
        displayItem: function(obj) {
            var html;
            html = '<div class="todolist-item" id="item-%id%"><h2 class="todolist-item-text">%input%</h2><div class="buttons"><button class="completed-btn"><img src="images/done.png" alt="" class="delete-img"></button><button class="delete-btn"><img src="images/Layer_17.png" alt=""   class="delete-img"></button></div> </div>';
            newHtml = html.replace("%input%", obj.inputText);
            newHtml = newHtml.replace("%id%", obj.id)

            // Append the element to the html
            document.querySelector(DOMstrings.todolistContainer).insertAdjacentHTML("beforeend", newHtml);
        },
        displayComItem: function(obj) {
            var html;
            html = '<div class="completed-item id="item-%id%""><h2 class="completed-item-text">%input%</h2><div class="remove"><i><img src="images/rect833.png" alt="" class="remove-img"></i></div></div>';
            newHtml = html.replace("%input%", obj.inputText);
            newHtml = newHtml.replace("%id%", obj.id)
                // Append the element to the html
            document.querySelector(DOMstrings.compListContainer).insertAdjacentHTML("beforeend", newHtml);

        },
        clearFields: function(input) {
            document.querySelector(input).value = "";

        },

        titleTime: function() {
            var now, hours, minutes, timeStamp, formatHours, formatMinutes, greeting;
            // Date the object constructor
            now = new Date;
            hours = now.getHours();
            minutes = now.getMinutes();
            hours > 12 ? timeStamp = "PM" : timeStamp = "AM";
            hours > 12 ? greeting = "Good day" : greeting = "Good morning";
            hours < 10 ? formatHours = "0" + hours : formatHours = hours;
            minutes < 10 ? formatMinutes = "0" + minutes : formatMinutes = minutes;


            document.querySelector(DOMstrings.time).textContent = formatHours + ':' + formatMinutes + " " + timeStamp;
            document.querySelector(DOMstrings.hoursLeft).textContent = (24 - hours) + " hours";
            document.querySelector(DOMstrings.greeting).textContent = greeting
        },
        deleteToDoListItem: function(selectorID) {
            //Deleting the item  from the user interface
            var el;
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        getDomStrings: function() {
            return DOMstrings;
        }
    }

})();

// Controller Module

var controller = (function(dataCtrl, UICtrl) {
    var input, strings, newItem;
    strings = UICtrl.getDomStrings();

    // Add item to the function
    var addItem = function() {
        input = document.querySelector(strings.inputText).value;
        if (input.length > 0) {
            // 1. Add an item to the data structure
            newItem = dataCtrl.createItem(input);
            inputText = document.querySelector(strings.inputText);
            // 2 Add an item to the UI 
            UICtrl.displayItem(newItem);
            // 3.Clear the input fields;
            UICtrl.clearFields(strings.inputText);
            // 4. Update the progress percentage
        };
        return newItem;
    };

    var toDoComplete = function() {
        // 1.Move the item from the todo data structure to the complete data structure
        // 2.Remove the item from the UI to do list and display it to the completed list
        // 3. Update the progress percentage
    };

    var ctrlDeleteItem = function(event) {
        var itemID;
        itemID = event.target.parentNode.parentNode.parentNode.id;
        // We need to separate the two buttons

        if (event.target.parentNode.className === "delete-btn") {
            // 1.delete an item from the data structure
            dataCtrl.deleteItem(newItem.id);
            // 2.delete an item from the User Interface
            UICtrl.deleteToDoListItem(itemID);
            // 3.Update the Progress Percentage
        } else if (event.target.parentNode.className === "completed-btn") {
            var newComItem;
            // 1.Create a new item from the one that is in the to do list
            var maybe = event.target.parentNode.parentNode.parentNode.firstChild.textContent;
            newComItem = dataCtrl.comItem(maybe);
            dataCtrl.deleteItem(newItem.id);
            // 2.Update User Interface
            // delete the item from the  to dolist items
            UICtrl.deleteToDoListItem(itemID);
            // Display the item to the completed tasks
            UICtrl.displayComItem(newComItem);
            // 3.Update the progress bar
        }

    };

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            addItem();
        }
    });
    document.querySelector(strings.pen).addEventListener("click", addItem);
    document.querySelector(strings.listContainer).addEventListener("click", ctrlDeleteItem);

    return {
        init: function() {
            UICtrl.titleTime();
        }
    }


})(dataController, UIController);

// The init function
controller.init();