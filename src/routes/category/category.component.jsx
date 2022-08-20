import { useContext, useState, useEffect, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import { CategoriesContext } from '../../components/contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

// KATEGORIE V SHOPE / TITLE
const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    //we set that our product will not update unless category or cM changes
    useEffect (() => {
        setProducts (categoriesMap[category])    // there we set value equal to categoriesMap at category

    }, [category, categoriesMap])   //Whenever ..., ... changes, spusti sa useEffect
    
    return ( 
        <Fragment>
            <h2 className='category-title'> {category.toUpperCase()} </h2>

            <div className='category-container'>
                {products && // categories fetch data async, preto robime safeguard - if products is udefined, then dont render - only render productsMap when products has value
                    products.map((product) => <ProductCard key={product.id} product={product} />) 
                }
            </div>
        </Fragment>
    )
}

export default Category;