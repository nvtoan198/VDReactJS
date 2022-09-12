import { createSelector } from 'reselect';

const stateHome = state => state.home; // lay state trong reducer

export const getLoadingHome = createSelector(
    stateHome,
    state => state.loadingHome
);
export const getErrorHome = createSelector(
    stateHome,
    state => state.errorHome
);
export const getDataProductState = createSelector(
    stateHome,
    data => data.dataProducts
);