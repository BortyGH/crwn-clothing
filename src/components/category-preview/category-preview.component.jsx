import ProductCard from '../product-card/product-card.component'
import {Link} from 'react-router-dom'

import './category-preview.styles.scss'


const CategoryPreview = ({ title, products }) => {

    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}> {/* we using title as our route, prevedie nas to po kliknuti na title do kategorie(jackets, hats) */}
                {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
            {
                products.filter((_, idx) => idx < 4)  // we filter array of products, _ is the product that i ignore, 2.arg is index inside of array
                        .map((product) => (<ProductCard key={product.id} product={product} />)) //product goes to product
            }
            </div>
        </div>
    )

}

export default CategoryPreview;