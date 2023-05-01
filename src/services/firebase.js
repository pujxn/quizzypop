import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, query, where, getDocs, doc, onSnapshot, updateDoc } from "firebase/firestore";

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


const getDocIdFromGameId = async (gameId) => {
    const q = query(collection(db, "games"), where("gameId", "==", gameId));
    try {
        const querySnapshot = await getDocs(q);
        let queryId = "";
        querySnapshot.forEach((doc) => {
            queryId = doc.id;
        });
        return queryId;
    } catch (e) {
        console.log(e);
    }
}


const listenForJoiner = (gameId, wrapperFn) => {
    // const q = query(collection(db, "games"), where("gameId", "==", gameId));
    // try {
    //     const querySnapshot = await getDocs(q);
    //     let queryId = "";
    //     querySnapshot.forEach((doc) => {
    //         queryId = doc.id;
    //     })

    let docId = "";

    getDocIdFromGameId(gameId).then(result => {
        console.log("IN HEREEE", result)
        docId = result;
        onSnapshot(doc(db, "games", docId), querySnap => {
            console.log(querySnap.data());
            querySnap.data().joiningPlayer && wrapperFn(true);
        })
    })

    // try {

    // }

    //     catch (e) {
    //     console.log(e);
    // }
}

const updateJoiningPlayer = (gameId) => {
    console.log("HMM")
    let docId = "";
    getDocIdFromGameId(gameId).then(async (result) => {
        docId = result;
        console.log("YOOOHOOO", result)
        await updateDoc(doc(db, "games", docId), {
            "joiningPlayer": "pujan"
        })
    })
}

export { addGameToDb, checkGameExists, listenForJoiner, updateJoiningPlayer };