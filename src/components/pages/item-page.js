import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import Error from '../error';
import { menuLoaded, menuRequested, menuError } from '../../actions';
import WithRestoService from '../hoc';

import './item-page.css';

class ItemPage extends Component {

    componentDidMount() {
        const {menuItems} = this.props;
        if (menuItems.length > 0) {
            return;
        }
        console.log('get menuItems data');
        const {menuRequested, menuLoaded, menuError} = this.props;
        menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(e => {
                menuError();
                console.error('menu loaded error');
            });
    }

    render () {

        //console.log(this.props);

        const id = +this.props.match.params.id;
        const {menuItems, loading, error} = this.props;
        const menuItem = menuItems.find(el => +el.id === +id);

        if (error || menuItem === undefined) {
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }

        const {title,price,url,category} = menuItem;

        return (
            <div className = "item_page">
                <div className="menu__item item_block">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <button className="menu__btn">Add to cart</button>
                    <span className = {`menu__category_Img ${category}`}></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));