import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingCart: false,
    dataCarts: [],
    errorCart: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        startAddProductCart(state, action){
            state.loadingCart = action.payload;
        },
        changeQuantity(state, action){
            const { id, quantity } = action.payload || { id: 0, quantity: 0 };
            // cap nhat lai so luong mua cua san pham co id gui len
            const quantityItems = state.dataCarts.map(item => {
                return item.id === id ? {...item, qty: quantity} : item;
            });
            if(quantityItems !== undefined){
                state.dataCarts = quantityItems;
                state.errorCart = null;
            }
        },
        removeItemCart(state, action){
            const idItem = action.payload || 0;
            // xoa bo san pham co id gui len trong gio hang
            // giu lai cac san pham ko trung id gui len
            const removeItems = state.dataCarts.filter(item => item.id !== idItem);
            if(removeItems !== undefined){
                state.dataCarts = removeItems;
                state.errorCart = null;
            }
        },
        addProductCartSuccess(state, action){
            const infoPd = action.payload.data; // thong tin chi tiet san pham
            const idPd   = infoPd['id'] || 0; // id cua san pham
            const qtyPd  = action.payload.qty || 1;

            // kiem tra san pham them vao gio hang ton tai trong gio hang truoc do hay chua ?
            // gio hang : state.dataCarts
            const findPd = state.dataCarts.find(item => item.id === idPd);
            if(findPd === undefined){
                // ko ton tai
                // them luon san pham vao gio hang
                // bo sung truong so luong mua vao du lieu gio hang
                infoPd.qty = qtyPd; // mac dinh mua 1 san pham
                state.dataCarts.push(infoPd);
            } else {
                // data ton tai
                // cap nhat lai so luong mua san pham
                // khong cap nhat lai du lieu trong gio hang
                findPd.qty += qtyPd;
            }
            state.errorCart = null;
        },
        addProductCartFailure(state, action){
            state.errorCart = action.payload;
        }
    }
});

export const actionCart = cartSlice.actions;
export default cartSlice.reducer;