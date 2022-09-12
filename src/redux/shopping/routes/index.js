import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import loadable from '@loadable/component';

const NotFoundPage = loadable(() => import('../pages/errors/404'));
const HomePage = loadable(() => import('../pages/home/index'));
const CartPage = loadable(() => import('../pages/cart/index'));
const DetailPage = loadable(() => import('../pages/detail/index'));

const RouteApp = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/:slug-:id" element={<DetailPage/>} />
            {/* not found request */}
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}
export default React.memo(RouteApp);