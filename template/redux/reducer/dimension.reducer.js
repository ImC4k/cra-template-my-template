const initialState = {
    isPortrait: window.innerHeight > window.innerWidth
};

const dimensionReducer = (state = initialState, action) => {
    if (action.type === 'SET_IS_PORTRAIT') {
        return { ...state, isPortrait: action.isPortrait };
    }
    else {
        return state;
    }
}

export default dimensionReducer;