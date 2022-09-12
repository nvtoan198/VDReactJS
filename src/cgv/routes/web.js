import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { AuthProvider } from '../hooks/useAuth';
import ProtectedLayout from '../components/ProtectedLayout';
import { Skeleton } from 'antd';

import NotFoundPage from '../pages/errors/404';

//import PopularPage from '../pages/popular/index';
const PopularPage = lazy(() => import('../pages/popular/index'));
//import UpComingPage from '../pages/coming/index';
const UpComingPage = lazy(() => import('../pages/coming/index'));
//import SearchPage from '../pages/search/index';
const SearchPage = lazy(() => import('../pages/search/index'));
//import DetailPage from '../pages/detail/index';
const DetailPage = lazy(() => import('../pages/detail/index'));
//import LoginPage from '../pages/login/index';
const LoginPage = lazy(() => import('../pages/login/index'));

const RouteMovies = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<Skeleton active/>}>
                            <PopularPage/>
                        </Suspense>      
                    } />
                    <Route path="/up-coming" element={
                        <Suspense fallback={<Skeleton active/>}>
                            <ProtectedLayout>
                                <UpComingPage/>
                            </ProtectedLayout>
                        </Suspense>
                    } />
                    <Route path="/search" element={
                        <Suspense fallback={<Skeleton active/>}>
                            <SearchPage/>
                        </Suspense>
                    } />
                    {/* localhost:3000/spider-man-no-way-home-12333 */}
                    {/* localhost:3000/:slug-:id */}
                    <Route path="/:slug-:id" element={
                        <Suspense fallback={<Skeleton active/>}>
                            <DetailPage/>
                        </Suspense>
                    } />
                    <Route path="/login" element={
                        <Suspense fallback={<Skeleton active/>}>
                            <LoginPage/>
                        </Suspense>
                    }/>
                    {/* not found request */}
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default React.memo(RouteMovies);