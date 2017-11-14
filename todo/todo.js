(function () {

    var todoLists = [];
    var activeTodos; // this is the list of to-dos
    var activeTodo; // this is the active to-do

    var $listBar = $('#listbar');
    var $listBarList = $('#listbar .list');
    var $listBarInput = $('#listbar input')
    var $listView = $('#listview');
    var $listViewInput = $('#listview input');
    var $listViewList = $('#listview .list');
    var $listViewDone = $('#listview .done');
    var $btnAddTodo = $('#addTodoButton');
    var $btnSaveTodo = $('#saveTodoButton');
    var $btnClearDone = $('#clearDoneButton');
    var $btnAddListBar = $('#addListButton');


    // this will start our application
    function init(data) {
        todoLists = data;
        updateLists(data);

        $listView.hide();
        $btnSaveTodo.hide();

        $btnSaveTodo.click(saveTodoItem);
        $btnAddTodo.click(newTodoItem);
        $btnClearDone.click(clearDone);
        $btnAddListBar.click(newListItem);
    }

    function save() {
        localStorage.setItem('todos', JSON.stringify(todoLists));
    }

    function updateLists() {
        $listBarList.empty();

        for (var i = 0; i < todoLists.length; i++) {
            // console.log(data[i].label);
            addListItem(todoLists[i]);
        }

        save();
    }

    function addListItem(listItem) {
        var $listItem = $("<span class='todolable2'>" + listItem.label + "</span>" +
            "<div>" +
            "<button class='edit'>Edit</button>" +
            "<button class='del'>DELETE</button>" +
            "</div>" +
            "</div>");

        $listBarList.append($listItem);

        $listItem.find('.edit').click(listItem, editListItem);
        $listItem.find('.del').click(listItem, deleteListItem);
    }

    function editListItem(evt) {
        $listView.show();
        // console.log(evt.data);
        var todos = evt.data;
        $listView.find('.title').html(todos.label);
        activeTodos = todos;
        updateTodos();
    }

    function deleteListItem(evt) {
        // console.log(evt.data);
        var listItem = evt.data;
        var len = todoLists.length; // how many items are in the array
        for (var i = 0; i < len; i++) {
            if(todoLists[i] === listItem) {
                todoLists.splice(i, 1); // delete item found at index (i) only remove 1
            }
        }
        updateLists();
    }

    function updateTodos() {
        $listViewList.empty();
        $listViewDone.empty();

        var todosList = activeTodos.list;
        var len = todosList.length;

        for (var i = 0; i < len; i++) {
            // console.log(data[i].label);
            var todo = todosList[i];
            if(todo.done) {
                addTodoItemToDone(todo);
            } else {
                addTodoItem(todo);
            }
        }

        save();
    }
    
    function addTodoItem(todoItem) {
        var $todoItem = $("<span class='todolable2'>" + todoItem.label + "</span>" +
            "<div>" +
            "<button class='edit'>Edit</button>" +
            "<button class='del'>DELETE</button>" +
            "<button class='done'>DONE</button>" +
            "</div>" +
            "</div>");

        $listViewList.append($todoItem);

        $todoItem.find('.edit').click(todoItem, editTodoItem);
        $todoItem.find('.del').click(todoItem, deleteTodoItem);
        $todoItem.find('.done').click(todoItem, doneTodoItem);
    }

    function addTodoItemToDone(todoItem) {
        var $todoItem = $("<div class='todolable2'>" + todoItem.label + "</div>");
        $listViewDone.append($todoItem);
    }

    function newListItem(evt) {
        var label = $listBarInput.val();
        var listItem = {
            label: label,
            list: []
        };
        todoLists.unshift(listItem);
        updateLists();

        $listBarInput.val('');
    }

    function clearDone() {
        var list = activeTodos.list;
        var i = list.length;
        while(i--) { // backwards loop
            var todo = list[i];
            if(todo.done) {
                list.splice(i, 1);
            }
        }
        updateTodos();
    }

    function newTodoItem(evt) {
        var label = $listViewInput.val();
        var todoItem = {
            label: label,
            done: false
        };
        activeTodos.list.unshift(todoItem);
        updateTodos();

        $listViewInput.val('');
    }

    function saveTodoItem(evt) {
        var newLabel = $listViewInput.val();
        activeTodo.label = newLabel;

        $btnAddTodo.show();
        $btnSaveTodo.hide();

        $listViewInput.val('');

        updateTodos();
    }

    function editTodoItem(evt) {
        activeTodo = evt.data;
        // set input value to label
        $listViewInput.val(activeTodo.label);

        $btnAddTodo.hide();
        $btnSaveTodo.show();

    }

    function deleteTodoItem(evt) {
        // console.log(evt.data);
        var todoItem = evt.data;
        var list = activeTodos.list;
        var len = list.length; // how many items are in the array
        for (var i = 0; i < len; i++) {
            if(list[i] === todoItem) {
                list.splice(i, 1); // delete item found at index (i) only remove 1
            }
        }
        updateTodos();
    }

    function doneTodoItem(evt) {
        var todoItem = evt.data;
        todoItem.done = true;

        updateTodos();
    }

    // this is sample data to test our to do app
    // var data = [
        // {
        //     label: "Test 1",
        //     list: [
        //         {
        //             label: "To do 1",
        //             done: false
        //         },
        //         {
        //             label: "To do 2",
        //             done: false
        //         },
        //         {
        //             label: "To do 3",
        //             done: false
        //         }
        //     ]
        // },
        // {
        //     label: "Test 2",
        //     list: [
        //         {
        //             label: "To do 4",
        //             done: true
        //         },
        //         {
        //             label: "To do 5",
        //             done: false
        //         },
        //         {
        //             label: "To do 6",
        //             done: false
        //         }
        //     ]
        // },
        // {
        //     label: "Test 3",
        //     list: [
        //         {
        //             label: "To do 7",
        //             done: true
        //         },
        //         {
        //             label: "To do 8",
        //             done: false
        //         },
        //         {
        //             label: "To do 9",
        //             done: false
        //         }
        //     ]
        // }
    // ];

    var data = JSON.parse(localStorage.getItem('todos')) || [];

    // call init to set the data
    init(data);

}());