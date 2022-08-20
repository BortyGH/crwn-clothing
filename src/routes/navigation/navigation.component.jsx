import {Fragment, useContext} from 'react';
import {Outlet} from 'react-router-dom';

import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from '../../components/contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {signOutUser} from '../../utils/firebase/firebase.utils';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {

    const { currentUser, /*setCurrentUser*/} = useContext(UserContext) //i am going to call useContext on the userContext and we want actual value => {currentUser}
    const { isCartOpen } = useContext(CartContext);
    
  /*  const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    } */

    return (

        <Fragment>   
      {/*FRAGMENT - je komponent, ktorý sa po pripojení na DOM nevykreslí, a dalej - musi mat rodica*/}
                <NavigationContainer>
                
                        <LogoContainer to='/'>     {/* logo obalene v link */}

                                <CrwnLogo className='logo' />

                        </LogoContainer>

                        <NavLinks>

                                <NavLink to='/shop'>
                                        SHOP
                                </NavLink>

                                {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)    // if there is currenUser then show sign out
                                : (<NavLink to='/auth'>
                                        SIGN IN </NavLink>
                                )}

                                <CartIcon />


                        </NavLinks>
                        
                    {isCartOpen && <CartDropdown />} {/* if isCartOpen true, then return <CartDropdown />, if it is false it wont return */}
                                                     {/* it is BOOLEAN and short circuit operator */}
                </NavigationContainer>
                
        <Outlet />
        {/* aby sa nemuseli vrstvit .com/home/shop... */}
  
        </Fragment>

    )
  }

  export default Navigation;