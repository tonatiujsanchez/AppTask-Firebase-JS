import {
    saveTask, 
    getTasks, 
    onSnapshot, 
    colletionDB, 
    deleteTask as deleteTaskDB,
    getTask,
    updateTask
} from './../config/firebase.js';

const formulario = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
let editStatus = false;
let taskUpdate = {
    idTask: '',
    title: '',
    description: ''
};

window.addEventListener('DOMContentLoaded', async()=>{
    onSnapshot( colletionDB, ( querySnapshot )=>{
        tasksContainer.innerHTML = '';
        querySnapshot.forEach( doc => {  
            buildTask( doc );
        });
    })

    // const querySnapshot = await getTasks();
});



formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const title = formulario['task-title'];
    const description = formulario['task-description'];
    
    if( (title.value).trim() === '' || (description.value) === '' ){
        alert('Completa los campos.');
    }else{
        if( !editStatus ){
            saveTask( title.value, description.value );
        }else{
            taskUpdate.title = title.value;
            taskUpdate.description = description.value;

            updateTask( taskUpdate );

            formulario['btn-task-save'].innerText = 'Add';
            editStatus = false;

        }
        formulario.reset();
    }
});

const buildTask = ( doc )=>{

    const task = doc.data();
    const taskID = doc.id;

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
        h3.innerHTML = task.title;
    const p = document.createElement('p');
        p.innerText = task.description;
    const btnDelete = document.createElement('button');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener( 'click', ()=> deleteTask( taskID ) );
    
    const btnEdit = document.createElement('button');
        btnEdit.innerText = 'Edit';
        btnEdit.addEventListener( 'click', ()=> editTask( taskID ) );
    
    div.appendChild( h3 );
    div.appendChild( p );
    div.appendChild( btnDelete );
    div.appendChild( btnEdit );
    
    tasksContainer.appendChild( div );
}


const deleteTask = ( idTask )=>{
    deleteTaskDB( idTask )
}

const editTask = async( idTask )=>{
    const task = (await getTask( idTask )).data();

    formulario['task-title'].value = task.title;
    formulario['task-description'].value = task.description;
    formulario['btn-task-save'].innerText = 'Update';
    
    editStatus = true;
    taskUpdate.idTask = idTask;

}