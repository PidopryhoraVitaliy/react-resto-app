import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, addedToOrder} from '../../actions';
import WithRestoService from '../hoc';
import './cart-table.scss';

const CartTable = ({items, deleteFromCart, addedToOrder, RestoService, orderId}) => {

    if (orderId.length !== 0) {
        return (<div className="cart__title">You order: {orderId}</div>)
    }
    if (items.length === 0) {
        return (<div className="cart__title">There are no items to add to the order</div>)
    }

    const createOrder = (items) => {
        return {
            id: generateNewId(),
            items: items.map(item => {
                return {
                    id: item.id,
                    quantity: item.quantity
                }
            })
        };
    }

    const onOrder = () => {
        if (items.length === 0) {
            console.log('There are no items to add to the order');
            return;
        }
        const order = createOrder(items);
        RestoService.addOrder(order)
            .then(res => {
                if (res) {
                    addedToOrder(order.id);
                } else {
                    console.log('this is error message from json-server...');
                }
            })
            .catch(e => {
                console.error('addedToOrder error', e);
            });
    }

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {id, title, url, price, quantity, sum} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-title">{quantity}</div>
                                <div className="cart__item-title">{sum}$</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="cart__title">
                <button onClick={() => onOrder()} className="menu__btn">Order</button>
            </div>
        </>
    );
};

const generateNewId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const mapStateToProps = ({items, orderId}) => {
    return {
        items,
        orderId
    }
}
const mapDispatchToProps = {
    deleteFromCart,
    addedToOrder
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
