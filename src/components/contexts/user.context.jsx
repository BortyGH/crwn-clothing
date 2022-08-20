import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener} from "../../utils/firebase/firebase.utils";
//actual value you want to access
export const UserContext = createContext({
    currentUser: null,          //you want null check to define whether or not you have user existing object or no object, keby je empty tak = true
    setCurrentUser: () => null, //empty func that returns null

})
//do objectu passneme default value = metoda{}

//Provider allows any of its child components to access values inside of its use state
export const UserProvider = ({children}) => {               //UserProvider allows to {children} get value from currentUser = useState
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};            //generujeme value ktoru chceme passnut do {value}

    
  useEffect(() => {                                         // when user signout we wanna store null, when signin we store user object
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) { 
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
    });  // i only want to run this func once when the component mounts []
    return unsubscribe;                                  // const unsubscribe zastavi open listening z firebase, ked sa component unmount
    }, [])                                               // onAuthStateChangedListener recieves some kind of callback func
                                                         // UNSUBSCRIBE WHENEVER YOU UNMOUNT
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>  //kazdy kontext ktory je built for je .Provider a to je komponent
}                                                                                 //ktory wrapuje dalsie komponenty ktore potrebuju pristup k inside values