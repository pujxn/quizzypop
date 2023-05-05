import { initializeApp } from "firebase/app";
import { collection, getFirestore, query, where, getDocs, doc, onSnapshot, updateDoc, setDoc, getDoc } from "firebase/firestore";

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
    const collectionRef = collection(db, "games");
    try {
        await setDoc(doc(collectionRef, gameId), {
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


const listenForJoiner = (gameId, wrapperFn) => {

    onSnapshot(doc(db, "games", gameId), querySnap => {
        // console.log(querySnap.data());
        (querySnap.data().joiningPlayer && querySnap.data().questions) && wrapperFn(true);
    })
}

const listenForBothAnswered = (gameId, wrapperFn) => {
    onSnapshot(doc(db, "games", gameId), querySnap => {
        (querySnap.data().joinerAnswered == "true" && querySnap.data().creatorAnswered == "true") && (
            // setTimeout(() => wrapperFn(1), 1000)
            console.log("HEYHEY", querySnap.data().joinerAnswered, querySnap.data().creatorAnswered)
        )
    })
}

const updateRecord = async (gameId, field, val) => {
    // console.log("HMM")

    await updateDoc(doc(db, "games", gameId), {
        [field]: val
    })
}


const getRecordDetails = async (gameId, field) => {

    const docRef = doc(db, "games", gameId);

    try {
        const docSnap = await getDoc(docRef);
        // console.log("Docsnap data for Qs", docSnap.data());
        return docSnap.data()[field];
    }
    catch (e) {
        console.log(e);
    }
}

const addCreatorAnswered = async (gameId, questionNumber) => {
    try {
        await updateDoc(doc(db, "games", gameId), {
            [`questions.${questionNumber}.creatorAnswered`]: true
        })
    } catch (e) {
        console.log(e);
    }
}

export { addGameToDb, checkGameExists, listenForJoiner, updateRecord, getRecordDetails, addCreatorAnswered, listenForBothAnswered };