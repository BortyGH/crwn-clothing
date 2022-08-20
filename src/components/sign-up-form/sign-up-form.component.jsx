import { useState } from 'react';
/*import { UserContext } from '../contexts/user.context';*/
import FormInput from '../form-input/form-input.component';
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';

import './sign-up-form.styles.scss'


const defaultFormFields = {

    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

//SignUpForm which is equal to func component that returns back
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);        //initialization
    const {displayName, email, password, confirmPassword} = formFields;     //destructuring values = pretoze ich budeme pouzivat inside our code

    /*const {setCurrentUser} = useContext(UserContext);*/

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleSubmit = async (event) => {

        event.preventDefault();                                             //Metóda preventDefault() zruší udalosť, ak ju možno zrušiť, čo znamená, že predvolená akcia, ktorá patrí k udalosti, nenastane. 
                                                                            //Môže to byť užitočné napríklad, keď: Kliknutím na tlačidlo „Odoslať“ mu zabránite v odoslaní formulára.

        if (password !== confirmPassword) {                                 // if password is not equal to confirm password then alert ''
            alert('passwords do not match');
            return;
        }

        try {
          const {user} = await createAuthUserWithEmailAndPassword( email, password );

         /* setCurrentUser(user); */

            await createUserDocumentFromAuth(user, {displayName});              // su tu zatvorky {displayName} pretoze pouzivame objekt z const

        resetFormFields();

        } catch(error) {

            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
            console.log('user creation encountered an error', error)
            }
        }
    };

    //nova GENERAL FUNCTION that takes(spusti) input event whenever text changes
    const handleChange = (event) => {

        const { name, value } = event.target;
                        //pretoze my budeme updateovat jeden input a prislusne pole formulara
                                        //[name] - vyuzijeme na konkretnu hodnotu, zober value a aplikuj to tu z variable of name a value will be value
        setFormFields ({...formFields, [name]: value}); //pouzivame setFormFields pretoze updatujeme vzdy set func
    };

    return(

        <div>
            <h2>Do not have an account?</h2>
            <span>Sign up with your email and password</span>

    {/*form component = nam dovoluje robit text fileds*/}
            <form onSubmit={handleSubmit}>    {/* event handler runs callback === určujú, aká akcia sa má vykonať pri každom spustení eventu(udalosti).
                                             Môže to byť kliknutie na tlačidlo alebo zmena v zadávaní textu 
                                            => You can control the submit action by adding an event handler in the onSubmit attribute for the <form>:*/}

                <FormInput  
                        label ="Name"
                        type='text'
                        required onChange={handleChange} 
                        name='displayName' 
                        value={displayName}/>


                <FormInput  
                        label="Email"
                        type="email" 
                        required onChange={handleChange} 
                        name="email" 
                        value={email}/>

                <FormInput  
                        label="Password"
                        type="password" 
                        required onChange={handleChange}
                        name="password"
                        value={password}/>

                <FormInput  
                        label="Confirm Password"
                        type="password"
                        required onChange={handleChange} 
                        name="confirmPassword"
                        value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>  {/* ked stlacime tento button, on submit spusti callback => A TEN sa spusti len ak budu vyplnene vsetky fields*/}

            </form>

        </div>

    );
};

export default SignUpForm;