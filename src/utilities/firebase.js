// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {useEffect, useState} from "react";
import {getDatabase, onValue, ref, set} from "@firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjKj8vo69tGAY82h29Ju89mDCE8WCqFvI",
    authDomain: "quick-react-scheduler-710b2.firebaseapp.com",
    databaseURL: "https://quick-react-scheduler-710b2-default-rtdb.firebaseio.com",
    projectId: "quick-react-scheduler-710b2",
    storageBucket: "quick-react-scheduler-710b2.appspot.com",
    messagingSenderId: "898814732743",
    appId: "1:898814732743:web:bed1fe723ada44990b51e2"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};
