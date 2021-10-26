import { initializeApp } from "firebase/app"

import { getFirestore, connectFirestoreEmulator, serverTimestamp, collection, doc, addDoc, setDoc, getDoc, getDocs, writeBatch } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPRAGNMZ4gc5g_SKlR5XEknN4u-fxnxPs",
  authDomain: "zerotomastery-react.firebaseapp.com",
  databaseURL: "https://zerotomastery-react.firebaseio.com",
  projectId: "zerotomastery-react",
  storageBucket: "zerotomastery-react.appspot.com",
  messagingSenderId: "51885256246",
  appId: "1:51885256246:web:f4188b1f1e0ecc66f37297",
  measurementId: "G-XQ2143TZGT"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, signupAdditionalData) => {
  if(!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if(!snapShot.exists() || signupAdditionalData) {
    try {
      let { displayName, email } = userAuth;

      if(signupAdditionalData && signupAdditionalData.displayName) {
        displayName = signupAdditionalData.displayName;
      }

      const defaultUserData = {
        email,
        createdAt: serverTimestamp()
      };

      /*
       * createUserProfileDocument() will fire twice on signUp
       *  signUp & userAuthenticated trigger it in quick succession
       *
       * Building onto defaultUserData, only include objects with truthy properties
       *  Firebase's set(), with merge option, will then take care of merging 
       */
      const userToCreate = Object.assign(
        defaultUserData,
        displayName ? { displayName } : null
      );

      await setDoc(userRef, userToCreate, { merge: true });
    } catch(error) {
      console.log('Error creating user: ', error.message);
    }
  }

  return userRef;
};

export const getUserCartRef = async (userId) => {
  const cartRef = collection(firestore, `users/${userId}/cart`);
  const cartSnapshot = await getDocs(cartRef);

  if(cartSnapshot.empty) {
    try {
      const cartDocRef = await addDoc(collection(firestore, `users/${userId}/cart`), {
        version: Date.now(),
        cartItems: []
      });

      return cartDocRef;
    } catch(error) {
      console.log('Error creating cart: ', error.message);
    }
  } else {
    return cartSnapshot.docs[0].ref;
  }
};

/*
 *  Used to add new collections and documents to Firebase
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);

  const batch = writeBatch(firestore);

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(firestore, collectionRef);
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

export const convertProductsToCategoryMap = products => {
  let categoriesMap = {};

  products.forEach(doc => {
    const { categories, id, imageFilename, lastUpdate, name, price } = doc.data();
    categories.forEach(cat => {
      const category = cat.toLowerCase();
      if(!categoriesMap[category]) {
        categoriesMap[category] = {
          title: cat,
          items: [],
          routeName: encodeURI(category)
        };
      }
      categoriesMap[category].items.push({
        id,
        name,
        imageFilename,
        price,
        lastUpdate
      });
    });
  });

  return categoriesMap;
};

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });