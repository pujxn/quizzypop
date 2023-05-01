import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, query, where, getDocs, doc, onSnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyBZuM6QyMkTnhA9a1Wsq06G_HzggMUgNvo",
    authDomain: "quizzypop-341ec.firebaseapp.com",
    projectId: "quizzypop-341ec",
    storageBucket: "quizzypop-341ec.appspot.com",
    messagingSenderId: "284490027379",
    appId: "1:284490027379:web:a266eea44a64ff59a0f506"
};

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
    try {
        const querySnapshot = await getDocs(q);
        return (querySnapshot.docs.length == 0) ? false : true;
    }
    catch (e) {
        console.log(e);
    }
}

const listenForJoiner = async (gameId, wrapperFn) => {
    const q = query(collection(db, "games"), where("gameId", "==", gameId));
    try {
        const querySnapshot = await getDocs(q);
        let queryId = "";
        querySnapshot.forEach((doc) => {
            queryId = doc.id;
        })
        onSnapshot(doc(db, "games", queryId), querySnap => {
            console.log(querySnap.data());
            querySnap.data().player1 && wrapperFn(true);
        })
    }
    catch (e) {
        console.log(e);
    }
}

// const triggerGameLog = (gameId) => {
//     onSnapshot(triggerGameStart(gameId), (doc) => {
//         console.log(doc.data());
//     })
// }

// db.collection("games")
//     .where("gameId", "==", gameId)
//     .onSnapshot((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.data())
//         });
//     })


export { addGameToDb, checkGameExists, listenForJoiner };