import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import './product-card.styles.scss';

    //   PRODUKTY V SHOPE

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);  /* inicializacia - whenever is button clicked, i am gonna call addItemToCart as a function and i am passing product through */

    return (
        
        <div className='product-card-container'>

        <img src={imageUrl} alt={`${name}`}/>               {/* alt value is for screen readers */}

            <div className='footer'>

                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
                
            </div>
                
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}> Add to card </Button> {/* whenever is button clicked, i am gonna call addItemToCart as a function and i am passing he product through */}
         </div>
    );
};

export default ProductCard;