
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    orderId: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false,
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true,
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const menuItem = state.menu.find(item => item.id === id);
            const itemsItem = state.items.find(item => item.id === id);
            let newItems = [];
            if (itemsItem === undefined) {
                newItems = [
                    ...state.items,
                    {
                        ...menuItem,
                        quantity: 1,
                        sum: menuItem.price
                    }
                ];
            } else {
                itemsItem.quantity++;
                itemsItem.sum = itemsItem.quantity * itemsItem.price;
                newItems = [...state.items];
            }
            return {
                ...state,
                orderId: '',
                items: newItems
            }
        case 'ITEM_REMOVE_FROM_CART':
            return {
                ...state,
                orderId: '',
                items: [
                    ...state.items.filter(item => item.id !== action.payload)
                ]
            }
        case 'ITEMS_ADDED_TO_ORDER':
            return {
                ...state,
                items: [],
                orderId: action.orderId
            }

        default:
            return state;
    }
}

export default reducer;