import { useState } from 'react';

/* import { UserContext } from '../contexts/user.context'; */

import FormInput from '../form-input/form-input.component';

import {
         signInWithGooglePopup,
         signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss'

const defaultFormFields = {

    email: '',
    password: '',
}

//SignUpForm which is equal to func component that returns back
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);        //initialization
    const {email, password} = formFields;                                   //destructuring values = pretoze ich budeme pouzivat inside our code

   /* const {setCurrentUser} = useContext(UserContext) */

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const signInWithGoogle = async () => {
      await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(
              email,
              password
            );

        /*  setCurrentUser(user); */

            resetFormFields();

          } catch (error) {
            switch (error.code) {               // SWITCH - allows us run code depending on what gets matched inside of error.code
                                                // if case is equal to 'this' then : alert 'this'
                                                // break - ak sa nestane tento prikaz tak chod dalej
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log(error);
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

        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

    {/*form component = nam dovoluje robit text fileds*/}
            <form onSubmit={handleSubmit}>    {/* event handler runs callback === určujú, aká akcia sa má vykonať pri každom spustení eventu(udalosti).
                                             Môže to byť kliknutie na tlačidlo alebo zmena v zadávaní textu 
                                            => You can control the submit
                                           action by adding an event handler in the onSubmit attribute for the <form>:*/}

                <FormInput  
                        label='Email'
                        type='email'
                        required onChange={handleChange} 
                        name='email' 
                        value={email}/>

                <FormInput  
                        label='Password'
                        type='password' 
                        required onChange={handleChange}
                        name='password' 
                        value={password}/>
                
                <div className='buttons-container'>  

                    <Button type='submit'>Sign In</Button>  {/* ked stlacime tento button, on submit spusti callback => A TEN sa spusti len ak budu vyplnene vsetky fields*/}
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button> 
                    
                </div>

            </form>

        </div>

    );
};

export default SignInForm;