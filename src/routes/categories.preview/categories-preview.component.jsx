import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../components/contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);  // give me {products} from useContext passing in the (ProductContext)
  console.log(Object.keys(categoriesMap));

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {  // how to map through CategorieContext? how we do get fields inside this object?
        //categoreisMap give us array of all of these key values - array of strings(hats, jackets)
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
            );
        })}
    </Fragment>
  );
};

export default CategoriesPreview;