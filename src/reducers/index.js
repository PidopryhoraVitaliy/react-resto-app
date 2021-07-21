
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                ...item
            }
            /*const newItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                url: item.url,
            }*/
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            }
        case 'ITEM_REMOVE_FROM_CART':
            return {
                ...state,
                items: [
                    ...state.items.filter(item => item.id !== action.payload)
                ]
            }

        default:
            return state;
    }
}

export default reducer;