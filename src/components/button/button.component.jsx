import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
  } from './button.styles';

  

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',                                                                   // google sign in, inverted = hodnoty z className
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({children, buttonType, ...otherProps}) => {                                    // our button is equal to functional component that will return button that has specific styling
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;                            // cez prop buttonType mozeme kontrolovat ako chceme rendrovat button
        /*<button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}           // je to ako pri `url(${imageUrl})` - nahradzuje si sam images
        {...otherProps} >
        {children} {/*text - ktory je v buttone(sign in, sign up)
        </button> */
    };


export default Button;