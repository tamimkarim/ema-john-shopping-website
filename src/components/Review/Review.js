import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
    const {cart, setCart} = useState([]);



    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cardProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];

            return product;
        });
        
    })
    return (
        <div>
            <h1>Cart Items review</h1>
        </div>
    );
};

export default Review;