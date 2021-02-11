/**
 * NOTE: this state is for loading userToken from redux, 
 * without this state to track whether the redux is initialized,
 * then react will mistakenly think that userToken doesn't exist 
 * on load, resulting an unnecessary redirection to sign-in page
 */

const initialState = {
    isFinishedLoadingStore: localStorage.getItem('non-existent') || true,
    isWaitingApi: false,
};

const loadingReducer = (state = initialState, action) => {
    if (action.type === 'SET_IS_WAITING_API') {
        return { ...state, isWaitingApi: action.isWaitingApi};
    }
    return state;
}

export default loadingReducer;