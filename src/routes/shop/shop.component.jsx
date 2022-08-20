//import { useContext } from 'react';

//import { CategoriesContext } from '../../components/contexts/categories.context';
//import ProductCard from '../../components/product-card/product-card.component';
//import CategoryPreview from '../../components/category-preview/category-preview.component';

import { Routes, Route } from 'react-router-dom'

import CategoriesPreview from '../categories.preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';


const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category />} /> {/*we have access to : and we render Category component  */}
    </Routes>
  );
  };


/*  

const { categoriesMap } = useContext(CategoriesContext);  // give me {products} from useContext passing in the (ProductContext)
  console.log(Object.keys(categoriesMap));

  return (
    <div className='shop-container'>
      {Object.keys(categoriesMap).map((title) => {  // how to map through CategorieContext? how we do get fields inside this object?
        //categoreisMap give us array of all of these key values - array of strings(hats, jackets)
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );

 /*        <div className='products-container'>
            {console.log(categoriesMap)}
            {categoriesMap[title].map((product) => (                //key is title. [title] give us corresponding value of array of products/categoriesMap
              <ProductCard key={product.id} product={product} />
            ))}
  </div> 

        })}
    </div>
  );
}; 

*/

export default Shop;