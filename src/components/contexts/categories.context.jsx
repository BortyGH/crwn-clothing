import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
//import { addCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// import SHOP_DATA from "../../shop-data";

export const CategoriesContext = createContext ({
    categoriesMap: {},        // we must store array of products with empty [] to signify what we want, vacsinou byva null

});      

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); //prazdny objekt je preto, že sme skutočne prepojení s object keys, aby sme získali odpovedajúci item pre cagegory. Takže ak sa to snažíme získať a nemáme žiadne keys, potom nedostaneme nič späť

//   useEffect (() => {
//        addCollectionAndDocuments('categories', SHOP_DATA); === POUZIJEME HO IBA RAZ, POTOM JE POTREBNE HO ZAKOMENTOVAT, pretoze zakazdym ak by sa runol, spravi v db nove values = 'categories' is name for colletion, SHOP_DATA is object we trying to add
//   }, []);

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
//        console.log(categoryMap);
        
        setCategoriesMap(categoryMap);
      };
      getCategoriesMap();
    }, []);
    

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider> //Aby sme odovzdali našu hodnotu každému komponentu v app, obklopíme ho komponentom Provider
    );
};