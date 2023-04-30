// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZuM6QyMkTnhA9a1Wsq06G_HzggMUgNvo",
    authDomain: "quizzypop-341ec.firebaseapp.com",
    projectId: "quizzypop-341ec",
    storageBucket: "quizzypop-341ec.appspot.com",
    messagingSenderId: "284490027379",
    appId: "1:284490027379:web:a266eea44a64ff59a0f506"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addGameToDb = async (gameId) => {
    try {
        await addDoc(collection(db, "games"), {
            gameId: gameId
        })
    } catch (e) {
        console.log(e);
    }
}

const checkGameExists = async (gameId) => {
    const q = query(collection(db, "games"), where("gameId", "==", gameId));
    // console.log(q);
    try {
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs);
        // querySnapshot.forEach((item) => {
        //     console.log(item.data());
        // })
        return (querySnapshot.docs.length == 0) ? false : true;

    }
    catch (e) {
        console.log(e);
    }
}

export { addGameToDb, checkGameExists };