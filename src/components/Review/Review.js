import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

    const handleProceedOrder = () => {
       history.push('/shipment')  
       
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


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
    }, []);

    let thankyou;
    if(orderPlaced){
       thankyou = <img src={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
           
           <div  className="product-container">
                {
                    cart.map(pd => <ReviewItems
                        removeProduct ={removeProduct}
                        key = {pd.key}
                        product={pd}></ReviewItems>)
                }
                {
                    thankyou
                }

           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedOrder} className="main-button">Proceed Checkout</button>
                </Cart>
           </div>  

        </div>
    );
};

export default Review;