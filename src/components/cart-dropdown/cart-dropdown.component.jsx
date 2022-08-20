import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';         // its hook thas allows us to get navigate func

import { CartContext } from '../contexts/cart.context';


import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, 
         EmptyMessage, 
         CartItems } from './cart-dropdown.style';



const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    };

    return (
        <CartDropdownContainer>
            {/*if cartItems exists(are more than 0) then */}
            <CartItems>
            {cartItems.length ? (
            cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
            ) : ( <EmptyMessage>Your cart is empty</EmptyMessage> )
            }
            </CartItems>
            
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            
        </CartDropdownContainer>
    );
};

export default CartDropdown;