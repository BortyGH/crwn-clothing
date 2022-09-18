import { initializeApp } from 'firebase/app';
// IA creates app instance based off of some type of config
// this config is object that allows us to attach Firebase app
import { getAuth, 
         GoogleAuthProvider, 
         signInWithPopup, 
         signInWithRedirect,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged,
        } from 'firebase/auth';
import { doc,         // doc = nám umožňuje získať dokumenty v našej databáze firestore, GET DOCUMENT INSTNANCE
         getDoc,      // get,setDoc - when we want access to data of this DOC, we need getDoc and setDoc
         setDoc,
         getFirestore,
         collection,  // collection - allows us get collections as userDocRef, ked pridavame nove kolekcie a dokumenty - func addCollectionAndDocuments
         writeBatch,  // je pre uspesnu transakciu, aby vstky transakcie prebehli a priradili sa spravne
         query,       
         getDocs,     
        } from 'firebase/firestore'; //inicializacia, firestore = riadi nasu databazu

    const firebaseConfig = {

    apiKey: "AIzaSyAjX0cIAOYi55VuWgJiS2qh10MYpWlgOK0",
    authDomain: "crwn-clothing-db-99b52.firebaseapp.com",
    projectId: "crwn-clothing-db-99b52",
    storageBucket: "crwn-clothing-db-99b52.appspot.com",
    messagingSenderId: "655121662688",
    appId: "1:655121662688:web:110148694bd9d5f2b38685"

    };


// Initialize Firebase

    const firebaseApp = initializeApp(firebaseConfig);
    console.log(firebaseApp);
    
    const googleProvider = new GoogleAuthProvider();

        googleProvider.setCustomParameters({
            prompt: 'select_account' ,        // vždy, keď niekto komunikuje s naším poskytovateľom, nútime ho, aby si vybral účet
        });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// this is going to be equal with anonymous function that going to return signInWithPopup, kde sme presli cez poskytovatel
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

    /* NAHODENIE PRODUKTOV DO FIREBASE*/

// ASYNC pretoze pridávame do nášho externého zdroja, voláme tu na API, aby sme uložili dáta // collectionKey argument is like users in firestore cloud(pomenovanie skupiny), 2.argument je JSON objekt
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

      const collectionRef = collection(db, collectionKey); //2. go with our DB instance as we know we did with Auth, SAYIN = dajte mi kolekciu v rámci DB a v rámci tejto DB ktoru kolkekciuKey hladame?
    //1. const collectionRef is equal to collection passing in our DB // 3. we must store objectsToAdd inside new colletionRef
      const batch = writeBatch(db);
      // batch is going to call writeBatch, we must pass in database, do ktorej chceme dávkovať, BATCH nám umožňuje pripojiť veľa zápisov, vymazaní, súborov
                        // object from SHOP_DATA su to vsetky vlastnosti v {}, mame ich tam 5
      objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())   // collectionRef tells do doc which database using
                                      // give me object and title and then lowerCase it
        batch.set(docRef, object);  // WE ADDED BATCH SET CALL THERE, creating a new docReference pre kazdy z tychto objektov, kde object=value a title=key
      });

      await batch.commit();    // awaitujeme spustenie batchu
      console.log('done');
};

export const getCategoriesAndDocuments = async () => {

        const collectionRef = collection(db, 'categories'); //to je collectionKey
        const q = query(collectionRef); // we gonna generate query out of collectionRef, we use query method by passing in collectionRef
                                        // this give us object that i can get from snapshot

        const querySnapshot = await getDocs(q); // getDocs is asynchornous ability to fetch tie Snapshot dokumenty, ktore chceme, pretoze teraz je vsetko zakapsulovane v querySnapshot
                                                // odtiaľto máme v skutočnosti prístup k rôznym document napshots z dokumentov Snapshot docs
        const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => { // REDUCE - In the context of a reduction, it takes an existing value (the accumulator) and value from an array to create a new value
          const {title, items} = docSnapshot.data();  //take snapshot and give me data from object{}
          acc[title.toLowerCase()] = items;
          return acc;
        }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

        if (!userAuth) return;

        const userDocRef = doc(db, "users", userAuth.uid);        //potrebujeme vidiet ci je tu existujuci odkaz(REFerence) na dokument
                        //doc takes 3 arguments = database, 'collection', identifier(unique ID), ktory povie co je to zac

//vytvorime metodu ktora je async func(createUserDocumentfromAuth), ktora dostane userAuth objekt
//pretoze to je to co dostaneme spat z Firebase auth alebo Google signin
//CHCEME NEJAKU FUNKCIU KTORA ZOBERIE DATA, KTORE ZISKAME Z AUTH SERVICE A POTOM ICH NAHODIME DOVNUTRA FIRESTORE

        const userSnapshot = await getDoc(userDocRef);      // s touto metodou ziskame kontrolu nad datami, zistime ci sa nachadzaju
                                //pouzijeme gedDoc metodu SNAPSHOT = DATA

    //WHEN USER DATA DOESNT EXIST
        // if it does not exist, this will return true, pretoze ak to neexistuje, chceme vytvorit newDoc
        // ak nase data(userSnapshot) neexistuju, tak vytvor tento dokument === cez try metodu
        if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth;            // SO IF DISPLAYNAME EXISTS ON USERAUTH, we dont pass any add Info
            const createdAt = new Date();                      //createdAt = datum, cas, uid. key info o userovi
        
        // v asynchronnych func v reacte sa error udava cez try
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
              });

          } catch (error) {
              console.log('error creating the user', error.message);
            }
          }
        
          return userDocRef;
        };


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>         // observer returns back whatever you get back from onAuthStateChanged
  onAuthStateChanged(auth, callback);                           // OPEN LISTENER = we are giving callback to onAuthStateChanged. spusti sa callback ked sa user prihlasi/odhlasi
// Hey, create me a LISTENER using this (callback)