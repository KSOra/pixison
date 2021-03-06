import storage from 'js/storage';

const initialState = {
    pages: storage.get('PAGES') || []
};

const reducer = {
    SET_PAGES(state, action) {
        state.pages = action.data;

        storage.set('PAGES', state.pages);

        return {...state}
    },
    ADD_PAGE(state, action) {
        state.pages = [...state.pages, action.data];

        storage.set('PAGES', state.pages);

        return {...state}
    },
    MODIFY_PAGE(state, action) {
        const index = state.pages.findIndex(page => page.url === action.data.url);

        state.pages[index] = action.data;
        state.pages = [...state.pages];
        storage.set('PAGES', state.pages);

        return {...state}
    },
    DELETE_PAGE(state, action) {
        const index = state.pages.findIndex(page => page.url === action.data);

        state.pages.splice(index, 1);
        state.pages = [...state.pages];
        storage.set('PAGES', state.pages);

        return {...state}
    }
};

export default function (state = initialState, action) {
    return reducer[action.type] ? reducer[action.type](state, action) : state;
}
