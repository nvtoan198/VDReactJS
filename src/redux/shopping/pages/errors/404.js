import React from 'react';
import LayoutComponent from '../../components/Layout';
import { Row, Col } from 'antd';

const NotFoundPage = () => {
    return (
        <LayoutComponent>
            <Row>
                <Col span={24}>
                    Not found!
                </Col>
            </Row>
        </LayoutComponent>
    )
}
export default React.memo(NotFoundPage);