import { createSelector } from "reselect";

const cartState = state => state.cart;

export const getLoadingCart = createSelector(
    cartState,
    state => state.loadingCart
)

export const getAllDataFromCarts = createSelector(
    cartState,
    data => data.dataCarts
);

export const countDataCart = createSelector(
    getAllDataFromCarts,
    items => items.length
)

export const getTotalMoneyCart = createSelector(
    getAllDataFromCarts,
    data => data.length > 0 ? data.map(item => parseFloat(item.price)*parseFloat(item.qty)).reduce((prev,next) => prev + next) : 0
);

export const getStateErrorCart = createSelector(
    cartState,
    state => state.errorCart
)