// Data Controller Module


var dataController = (function() {
    // create an item using the constructor function
    var todoItem = function(inputText) {
        this.inputText = inputText;
    };

    // Data structure
    var data = {
        todolist: [],
        completed: []
    };

    return {
        createItem: function(input) {
            var newItem;
            newItem = new todoItem(input);
            data.todolist.push(newItem);
            console.log(data)
            return newItem;
        }
    }

})();

// UI Controller module

var UIController = (function() {

    var DOMstrings = {
        inputText: ".input-text",
        pen: ".write-btn",
        todolistContainer: ".list-container"
    }


    return {
        displayItem: function(obj) {
            var html;
            html = '<div class="todolist-item"><h2 class="todolist-item-text">%input%</h2><div class="buttons"><button class="completed-btn"><img src="images/done.png" alt="" class="delete-img"></button><button class="delete-btn"><img src="images/Layer_17.png" alt=""   class="delete-img"></button></div> </div>';
            newHtml = html.replace("%input%", obj.inputText);

            // Append the element to the html
            document.querySelector(DOMstrings.todolistContainer).insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function(input) {
            document.querySelector(input).value = "";

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
    };

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            addItem();
        }
    })
    document.querySelector(strings.pen).addEventListener("click", addItem)


})(dataController, UIController);