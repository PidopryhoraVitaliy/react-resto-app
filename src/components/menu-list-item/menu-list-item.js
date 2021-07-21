import React from 'react';
import './menu-list-item.scss';
import { Link } from 'react-router-dom';


const MenuListItem = ({menuItem}) => {
    const {id,title,price,url,category} = menuItem;
    return (
        <li className="menu__item">
            <Link to={`/${id}`}>
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
            </Link>
            <div className="menu__category">Category: <span>{category}</span></div>
            <div className="menu__price">Price: <span>{price}$</span></div>
            <button className="menu__btn">Add to cart</button>
        </li>
    )
}

export default MenuListItem;