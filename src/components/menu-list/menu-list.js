import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
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

    render() {
        const {menuItems, loading, error} = this.props;
        if (error) {
            console.log('error: ' + error);
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }
        const items = menuItems.map(menuItem => {
                return <MenuListItem key={menuItem.id} menuItem={menuItem}/>
            })
        return (
            <View items={items}/>
            )
    }
};

const View = ({items}) => {
    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        menuLoaded: (newMenu) => {
            dispatch({
                type: 'MENU_LOADED',
                payload: newMenu
            })
        }
    }
}*/
const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));