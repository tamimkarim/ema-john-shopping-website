import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock } = props.product;

    return (
        <div className="product">
            <div>
                <img src={props.product.img} alt="" />

            </div>
            <div>
                <h4 className="product-name">{props.product.name}</h4>
                <br />
                <p className="seller"><small>by: {seller} </small></p>
                <p>${price} </p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button
                     onClick ={() => props.handleAddProduct(props.product)}
                     className="main-button">
                     <FontAwesomeIcon icon={faShoppingCart } />
                       add to cart
                </button>

            </div>

        </div>
    );
};

export default Product;