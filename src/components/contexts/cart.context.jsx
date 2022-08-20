import { createContext, useState, useEffect } from "react";


// PRIDANIE POLOZKY DO KOSIKA
const addCartItem = (cartItems, productToAdd) => {
    // 1. at first we must find if cartItems contains productToAdd = here we are searching through carItems with find method
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // 2. if theyre found, increment(increase) quantity
    if(existingCartItem) {                                     /* cize if we found match in our cart items  */
        return cartItems.map((cartItem) =>                     // then return new array of cartItems
            cartItem.id === productToAdd.id                    // is this (cartItem) the same as we trynna add(productToAdd)?
            ? {...cartItem, quantity: cartItem.quantity + 1}   // if it is, then return a new cartItem. We are doing new object, we are spreading through old props
            : cartItem                                         // if it doesnt match then return basic cartItem
        );
    };

    // 3. return new array with modified cartItems(new cart item)
    return [...cartItems, { ...productToAdd , quantity: 1}];
}

//we have to get original cartItems array, bcs we use that array to create new array where we increase or remove item, and cartItemToRemove
const removeCartItem = (cartItems, cartItemToRemove) => {
        // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
        // check if quantity is equal to 1, if it is then remove that item from the cart
        if(existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
        }
        // reutrn back cart items with matching cart item with reduced quantity
        return cartItems.map((cartItem) =>                     
        cartItem.id === cartItemToRemove.id             
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem                              
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//              ALEBO MOZNOST ROVNAKEHO KODU S {RETURN}
//const clearCartItem = (cartItems, cartItemToClear) => {
//   return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
//};

//tvorime kvoli CartContext.Provider. Tieto metody su vytovrene v createContexte by default
export const CartContext = createContext({   // tu exportujeme novo vytvorenu premennu, ktora sa rovna createContext from "react", tu z metod spravime {objekty}
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {}, 
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});


export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);  
    const [cartTotal, setCartTotal] = useState(0);  
    
    // na COUNTING IN BAG pouzijeme useEffect, pretoze pocitame total quantity every time when cartItems changes a preto = ak sa zmeni [cartItems]
    useEffect (() => {                             // i wanna take total and add the item quantity
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0); //1. argument is callback, 2. argument (0) is starting value
        setCartCount(newCartCount)    //sCC is equal to nCC, nastavujeme tu hodnotu set, uvedenu v useState(0) = teda inicializujeme novy const
    }, [cartItems]);                                           


    useEffect (() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);                                         

        //  INICIALIZACIA METOD musi prebehnut so SET //

    // + POLOZKY DO KOSIKA
    // bude to metoda ktora sa spusta hocikedy, ked user klikne na polozku s moznostou add to cart, preto we gonna recieve productToAdd
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    // - POLOZKY DO KOSIKA
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };
    // ODSTRANENIE POLOZKY Z KOSIKA
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal,
        };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider> 
    //Aby sme odovzdali našu hodnotu každému komponentu v našej aplikácii, obklopíme ho komponentom Provider

};