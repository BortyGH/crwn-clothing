import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import {Routes, Route} from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { setCurrentUser } from "./store/user.action";
import { createUserDocumentFromAuth, onAuthStateChangedListener} from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

const App = () => {
  //efekt je spustený len na inicializáciu, aby sa nastavil listener
  const dispatch = useDispatch();

  useEffect(() => {                                         // when user signout we wanna store null, when signin we store user object
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) { 
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });  // i only want to run this func once when the component mounts []
    return unsubscribe;   // const unsubscribe zastavi open listening z firebase, ked sa component unmount
    }, [dispatch]);
  
  return (
    <Routes>  {/*aby sa nemuselo vrstvit /home/shop a dalej */}

    {/* Obalene v Route Navigation, pretoze to je cela nav */}
        <Route path="/" element={<Navigation />}> 

            <Route index element={<Home />} />    {/* INDEX je atribut, ktory sa rovná hodnote true === 
                                                      to znamena ze ak bude zadane / tak to automaticky znamena home
                                                  */}

            <Route path="shop/*" element={<Shop />} />

            <Route path="auth" element={<Authentication />} />

            <Route path="checkout" element={<Checkout />} />

        </Route>

    </Routes>
  );
};

//  it allows application to register these route components that will then in turn render a specific component 
//  when it matches this specific route that you're looking for

export default App;