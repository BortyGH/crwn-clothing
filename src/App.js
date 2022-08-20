import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import {Routes, Route} from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";


const App = () => {
  
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