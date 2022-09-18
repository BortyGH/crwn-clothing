import { combineReducers } from "redux"; //CR = method that allows us to create final reducer we can use in store by combining smaller reducers together
                                        // aby sme mohli pouzit viacero reducerov, musime pouzit combineReducer
import { userReducer } from "./user/user.reducer"; 
            // inside combineReducees we passing object; then i want key to be equal to user and value: userReducer
export const rootReducer = combineReducers({
   //key
    user: userReducer,

});