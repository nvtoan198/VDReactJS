import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { countDataCart } from '../../redux/selectors/CartSelector';

const { Header } = Layout;

const HeaderComponent = () => {
    const countCart = useSelector(countDataCart);

    const { pathname } = useLocation();
    const items = [
        {label: <Link to="/">Home</Link>, key: '/'},
        {label: <Link to="/cart">Cart ({countCart})</Link>, key: '/cart'},
    ];
    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={pathname}
                items={items}
            />
        </Header>
    )
}
export default React.memo(HeaderComponent);