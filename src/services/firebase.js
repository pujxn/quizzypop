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

const addGameToDb = async (gameId, creator) => {
    const collectionRef = collection(db, "games");
    try {
        await setDoc(doc(collectionRef, gameId), {
            gameId: gameId,
            creator: creator
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

    const unsubscribe = onSnapshot(doc(db, "games", gameId), querySnap => {
        (querySnap.data().joiningPlayer && querySnap.data().questions) && (
            wrapperFn(true),
            unsubscribe()
        );
    })
}

const listenForBothAnswered = (gameId, currentQuestion, wrapperFn) => {
    const unsubscribe = onSnapshot(doc(db, "games", gameId), querySnap => {
        (querySnap.data().questions[currentQuestion].joinerAnswered && querySnap.data().questions[currentQuestion].creatorAnswered) && (
            setTimeout(() => wrapperFn(prevState => prevState + 1), 1000),
            unsubscribe()
        )
    })
}

const updateRecord = async (gameId, field, val) => {

    await updateDoc(doc(db, "games", gameId), {
        [field]: val
    })
}


const getRecordDetails = async (gameId, field) => {

    const docRef = doc(db, "games", gameId);

    try {
        const docSnap = await getDoc(docRef);
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