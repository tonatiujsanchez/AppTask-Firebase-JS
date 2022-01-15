// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    collection, 
    getFirestore,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYWTe1vDADNeBQXXF7RcK7UeMCM_IGolc",
    authDomain: "crudapp-a682e.firebaseapp.com",
    databaseURL: "https://crudapp-a682e.firebaseio.com",
    projectId: "crudapp-a682e",
    storageBucket: "crudapp-a682e.appspot.com",
    messagingSenderId: "848108594571",
    appId: "1:848108594571:web:678aa2940a6e8aa8cafb8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colletionDB = collection( db, 'tasks' );


export const saveTask = ( title, description )=>{

    const task = { title, description };

    addDoc( colletionDB, task );
}

export const getTasks = ()=>{
    return getDocs( colletionDB );
}

export const onGetTasks = (  )=>{
    console.log('OnGetTasks');
}

export const deleteTask = ( idTask )=>{
    deleteDoc( doc( colletionDB, idTask ) );
}
export const getTask = ( idTask )=>{
    return getDoc( doc( colletionDB, idTask ) );
}
export const updateTask = ( task )=>{
    const idTask = task.idTask;
    const taskUpdate = {
        title: task.title,
        description: task.description
    }

    updateDoc( doc( colletionDB, idTask ), taskUpdate );
}

export {
    onSnapshot,
    colletionDB
}