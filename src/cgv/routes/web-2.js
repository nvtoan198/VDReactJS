import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import loadable from '@loadable/component';
import { AuthProvider } from '../hooks/useAuth';
import ProtectedLayout from '../components/ProtectedLayout';

//import NotFoundPage from '../pages/errors/404';
const NotFoundPage = loadable(() => import('../pages/errors/404'));

//import PopularPage from '../pages/popular/index';
const PopularPage = loadable(() => import('../pages/popular/index'));
//import UpComingPage from '../pages/coming/index';
const UpComingPage = loadable(() => import('../pages/coming/index'));
//import SearchPage from '../pages/search/index';
const SearchPage = loadable(() => import('../pages/search/index'));
//import DetailPage from '../pages/detail/index';
const DetailPage = loadable(() => import('../pages/detail/index'));
//import LoginPage from '../pages/login/index';
const LoginPage = loadable(() => import('../pages/login/index'));

const RouteMovies = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <PopularPage/>
                    } />
                    <Route path="/up-coming" element={
                        <ProtectedLayout>
                            <UpComingPage/>
                        </ProtectedLayout>
                    } />
                    <Route path="/search" element={
                        <SearchPage/>
                    } />
                    {/* localhost:3000/spider-man-no-way-home-12333 */}
                    {/* localhost:3000/:slug-:id */}
                    <Route path="/:slug-:id" element={
                        <DetailPage/>
                    } />
                    <Route path="/login" element={
                        <LoginPage/>
                    }/>
                    {/* not found request */}
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default React.memo(RouteMovies);