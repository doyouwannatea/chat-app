import { createStore } from 'redux';

const initialState = {
    name: '',
    isAuth: false,
    currentChat: '',
    contacts: {},
    isMobile: false,
    systemMessages: [],
    isNavbarActive: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return { ...state, name: action.payload };
        case 'LOGIN':
            return { ...state, isAuth: true };
        case 'CHANGE_CHAT':
            return { ...state, currentChat: action.payload };
        case 'UPDATE_CONTACTS':
            if (!Object.keys(action.payload).length) {
                return { ...state, contacts: action.payload, currentChat: '' };
            }
            return { ...state, contacts: action.payload };
        case 'UPDATE_IS_MOBILE':
            return { ...state, isMobile: action.payload };
        case 'UPDATE_SYSTEM_MESSAGES':
            const idx = state.systemMessages.findIndex(item => item.id === action.payload);
            const messages =  [...state.systemMessages.slice(0, idx), ...state.systemMessages.slice(idx + 1)];
            return { ...state, systemMessages: messages };
        case 'ADD_SYSTEM_MESSAGE':
            const updatedMessages = [ ...state.systemMessages, action.payload ];
            return { ...state, systemMessages: updatedMessages };
        case 'TOGGLE_NAVBAR_STATE':
            return { ...state, isNavbarActive: !state.isNavbarActive }
        default:
            return state;
    }
};

export default createStore(reducer);