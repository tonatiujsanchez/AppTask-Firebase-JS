import { saveTask, getTasks } from './../config/firebase.js';
const formulario = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');


window.addEventListener('DOMContentLoaded', async()=>{
    const querySnapshot = await getTasks();
    querySnapshot.forEach( doc => {  
        buildTask( doc.data() );
    });

    console.log( tasksContainer );
});



    formulario.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const title = formulario['task-title'];
        const description = formulario['task-description'];
        
        if( (title.value).trim() === '' || (description.value) === '' ){
            alert('Completa los campos.');
        }else{
            saveTask( title.value, description.value );
            title.value = '';
            description.value = '';
        }

    });

const buildTask = ( task )=>{
    console.log( task );
}
