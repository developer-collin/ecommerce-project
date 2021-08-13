import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getUserCartRef = async (userId) => {
  const cartRef = firestore.collection(`users/${userId}/cart`);
  const cartSnapshot = await cartRef.get();

  if(cartSnapshot.empty) {
    const cartDocRef = firestore.collection(`users/${userId}/cart`).doc();

    try {
      await cartDocRef.set({
        version: Date.now(),
        cartItems: []
      });
    } catch(error) {
      console.log('error creating cart', error.message);
    }

    return cartDocRef;
  } else {
    return cartSnapshot.docs[0].ref;
  }
};

/*
 *  Used to add new collections and documents to Firebase
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

export const convertProductsToCategoryMap = products => {
  let categoriesMap = {};

  products.docs.forEach(doc => {
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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

if (process.env.NODE_ENV === 'development') {
  firestore.useEmulator('localhost', 8080);
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;