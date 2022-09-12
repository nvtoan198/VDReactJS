// ProtectedLayout
// day la component de check viec user co duoc truc tiep vao cac page hay ko?
// dua vao viec da login hay chua ???

import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectLayout = ({ children }) => {
    const { user } = useAuth(); // ??? thong tin user da login dc luu vao localStorage
    const outlet = useOutlet();

    if(user === null){
        // redirect ve login
        return <Navigate to="/login" />;
    }
    return (
        <>
            {children}
            {/* chi hien component co quyen truy cap */}
            {outlet} 
        </>
    )
}
export default ProtectLayout;