import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

const { Header } = Layout;

const HeaderMovies = () => {
    const { pathname } = useLocation();
    const { logout, user } = useAuth();
    let items = [
        {label: <Link to="/">Popularity</Link>, key: '/'}, // popularity
        {label: <Link to="/up-coming">Up coming</Link>, key: '/up-coming'}, // up coming
        {label: <Link to="/search">Search</Link>, key: '/search'}, // search
    ];
    if(user === null){
        items = [
            ...items,
            {label: <Link to="/login">Login</Link>, key: '/login'},
        ];
    } else {
        items = [
            ...items,
            {label: <Button type="primary" onClick={() => logout()}>Logout</Button>, key: '/logout'},
        ];
    }
    
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
export default React.memo(HeaderMovies);