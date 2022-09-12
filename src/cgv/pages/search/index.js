import React from 'react';
import LayoutMovies from '../../components/Layout';
import { Row, Col } from 'antd';

const SearchPage = () => {
    return (
        <LayoutMovies>
            <Row>
                <Col span={24}>
                    <h3>This is search page!</h3>
                </Col>
            </Row>
        </LayoutMovies>
    )
}
export default React.memo(SearchPage);