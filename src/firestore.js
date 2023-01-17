import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgFgc5JvFhQBoxWHDkdOD4UHGDAD-Myyc",
  authDomain: "photo-tagging-48e7a.firebaseapp.com",
  projectId: "photo-tagging-48e7a",
  storageBucket: "photo-tagging-48e7a.appspot.com",
  messagingSenderId: "898124477796",
  appId: "1:898124477796:web:28f7e32295e5f079327671",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = (name, time) => {
  return { name, time };
};

async function addUser(user) {
  const docRef = await addDoc(collection(db, "users"), user);
  return docRef;
}

async function readData() {
  const docs = await getDocs(collection(db, "users"));
  const data = [];
  docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

export { app, db, User, addUser, readData };
