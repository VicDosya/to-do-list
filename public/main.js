const toDoInput = document.getElementById('toDoInput');
const deleteBtn = document.getElementById('deleteBtn');
const taskId = document.getElementById('taskId');
const submitBtn = document.getElementById('submitBtn');
const taskContainer = document.getElementById('taskContainer');

const fetchAllTasks = async () => {
    const response = await fetch('/api/tasks');
    const result = await response.json();
    taskContainer.innerText = '';
    result.forEach((taskToDo) => {
        const toDoTaskContainer = document.createElement('div');
        toDoTaskContainer.setAttribute("id", "toDoTaskContainer");

        const toDoTaskTitle = document.createElement('p');
        toDoTaskTitle.setAttribute("id", "toDoTaskTitle");

        const checkBoxTask = document.createElement('input');
        checkBoxTask.type = "checkbox";
        checkBoxTask.setAttribute("id", "checkBoxTask");

        toDoTaskContainer.append(toDoTaskTitle, checkBoxTask);
        taskContainer.appendChild(toDoTaskContainer);

        toDoTaskTitle.innerText = taskToDo.task;

        //If checked, make the completed content marked, otherwise, return regular.//
        checkBoxTask.addEventListener('change', function () {
            toDoTaskTitle.style.textDecoration = checkBoxTask.checked ? 'line-through' : 'none';
            toDoTaskTitle.style.color = checkBoxTask.checked ? '#D8D8D8' : 'black';
            toDoTaskContainer.style.backgroundColor = checkBoxTask.checked ? '#F7F7F7' : 'rgb(233, 233, 233)';
        });


    });
};

fetchAllTasks();

//Pressing the button sends data input to server - also fetches all tasks//
submitBtn.addEventListener('click', async () => {
    if(toDoInput.value === ''){
        toDoInput.innerText === 'Enter your todo!';
    } else {
        const response = await fetch('/api/tasks', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: toDoInput.value
            }),
        });
        const result = await response.json();
        toDoInput.value = '';
        console.log(result);
    
        fetchAllTasks();
    }
});
