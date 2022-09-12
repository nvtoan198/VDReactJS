import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LayoutComponent from '../../components/Layout';
import { useParams } from "react-router-dom";
import * as detailSelector from '../../redux/selectors/DetailSelector';
import { createStructuredSelector } from 'reselect';
import { getDetailProduct, addProductToCart } from '../../redux/sagas/ActionSaga';
import { Row, Col, Skeleton, Image, InputNumber, Button } from 'antd';


const DetailPage = () => {
    const [quantity, setQuantity] = useState(1);
    // :slug-:id // ten cua tham so
    const { id } = useParams();
    const { loading, error, detail } = useSelector(createStructuredSelector({
        loading: detailSelector.getLoadingStateDetail,
        error: detailSelector.getErrorStateDetail,
        detail: detailSelector.getDataDetailState
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailProduct(id));
    }, [id, dispatch]);

    const changeQuantityCart = (qty) => {
        setQuantity(qty);
    }

    const dispatchDetailPdCart = (id, qty) => {
        if(!isNaN(id) && qty > 0) {
            dispatch(addProductToCart(id, qty));
        } else {
            alert('Vui long nhap so luong mua');
        }
    }

    if(loading){
        return (
            <LayoutComponent>
                <Skeleton active />
            </LayoutComponent>
        )
    }

    if(error !== null){
        return (
            <LayoutComponent>
                Khong co du lieu
            </LayoutComponent>
        )
    }

    return (
        <LayoutComponent>
            <Row>
                <Col span={4}>
                    <Image src={detail.image} />
                </Col>
                <Col span={20} style={{padding: '32px'}}>
                    <h2>{detail.title}</h2>
                    <p>{detail.price} $</p>
                    <p>{detail.description}</p>
                    <InputNumber
                        min={1} max={10}
                        defaultValue={1}
                        onChange={val => changeQuantityCart(val)}
                    />
                    <Button
                        type="primary"
                        onClick={() => dispatchDetailPdCart(id, quantity)}
                    > Add Cart</Button>
                </Col>
            </Row>
        </LayoutComponent>
    )
}
export default React.memo(DetailPage);