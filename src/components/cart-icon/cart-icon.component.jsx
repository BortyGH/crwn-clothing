import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles';


const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext); 
                                                                //we want to inverse isCartOpen option, 
                                                                //teda ak je karta otvorena = tak ju zatvor a opacne, preto TOGGLE

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);  //func calls setIsCartOpen method, but it sets it with opposite value
                                                                //so the inverse value of what currently is isCartOpen
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>

            <ShoppingIcon className='shopping-icon'/>
            
            <ItemCount>{cartCount}</ItemCount>

        </CartIconContainer>
    );
};

export default CartIcon;