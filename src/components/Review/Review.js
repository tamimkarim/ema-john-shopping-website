import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);



    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];

            return product;
        });
        setCart(cartProducts);
    }, [])
    return (
        <div>
            <h1>Cart Items {cart.length}</h1>
            {
                cart.map(pd => <ReviewItems
                    
                    key = {pd.key}
                    product={pd}></ReviewItems>)
            }


        </div>
    );
};

export default Review;