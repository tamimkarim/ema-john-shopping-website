import React from 'react';

const ReviewItems = (props) => {
    console.log(props);
    const {name, quantity} = props.product;
    const reviewItemsStyle =
    {borderBottom : '1px solid lightgray',
    marginBottom: '5px',
    paddingBottom: '5px',
    marginLeft: '200px',
    marginRight: '700px'

    }


    return (
        <div style ={reviewItemsStyle} className ="review-item">
            <h4 className ="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
        
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItems;