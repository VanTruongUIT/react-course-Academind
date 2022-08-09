import React, { useContext } from 'react';

import classes from './Cart.module.css';
import Modal from '../../Modal/Modal';
import CartContext from '../../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    
  };
  const cartItemAddHandler = (item) => {

  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {
        cartCtx.items.map(item => {
          return (
            <CartItem 
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
          )
        })
      }
    </ul>
  );
  
  return (
    // click the backdrop of modal to close the cart modal
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {/* click the close button to close the cart modal */}
        <button 
          className={classes['button--alt']}
          onClick={props.onClose}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart;