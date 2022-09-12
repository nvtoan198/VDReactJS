import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Shopping ©2022 Created by ABC
        </Footer>
    )
}
export default React.memo(FooterComponent)