import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
    try {
      let { displayName, email } = userAuth;

      if(additionalData && additionalData.displayName) {
        displayName = additionalData.displayName;
      }

      const defaultUserData = {
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      /*
       * createUserProfileDocument() may fire twice on signUp, before snapShot.exists
       *  signUp & userAuthenticated trigger it in quick succession
       *
       * Building onto defaultUserData, only include objects with truthy properties
       *  Firebase's set(), with merge option, will then take care of merging 
       */
      const userToCreate = Object.assign(
        defaultUserData,
        displayName ? { displayName } : null
      );

      await userRef.set(userToCreate, { merge: true });
    } catch(error) {
      console.log('Error creating user: ', error.message);
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
      console.log('Error creating cart: ', error.message);
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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

if (process.env.NODE_ENV === 'development') {
  firestore.useEmulator('localhost', 8080);
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;