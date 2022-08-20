import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <div>
        <Directory />

        <Outlet />
    </div>
    );
  }
  // <Directory categories={categories} /> //MENU => We can embed JavaScript expressions in JSX by using curly braces,
                                         //If you have a variable to send, then use (curly brackets), 
                                         //cize vyrobime premennu {cateogires} a posleme ju do directory kvoli atributom
                                         
  export default Home;  //export home as default