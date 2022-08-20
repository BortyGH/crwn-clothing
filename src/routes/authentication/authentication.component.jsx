// import { signInWithGooglePopup,
//          createUserDocumentFromAuth,
//         } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication-styles.scss'


const Authentication = () => {

    // //async func = whenever you make a call to some database, it is asynchronous func
    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();     // získame value v asynchrónnej funkcii tým, že čakáme na zavolanie nášho sign with Google Popup
    //     const userDocRef = await createUserDocumentFromAuth(user); // nezalezi co sa stane, musime ziskat userDocReference
    // };

    return (
        <div className='authentication-container'>

            <SignInForm />
            <SignUpForm />

        </div>
    );
};

export default Authentication;