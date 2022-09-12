import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDataFromCarts, getTotalMoneyCart } from '../../redux/selectors/CartSelector';
import { createStructuredSelector } from 'reselect';
import LayoutComponent from '../../components/Layout';
import { Row, Col, Image, InputNumber, Button } from 'antd';
import { actionCart } from '../../redux/reducers/CartSlice';

const CartPage = () => {
    const { carts, totalMoney } = useSelector(createStructuredSelector({
        carts: getAllDataFromCarts,
        totalMoney: getTotalMoneyCart
    }));
    const dispatch = useDispatch();

    const deleteItemCart = id => {
        dispatch(actionCart.removeItemCart(id));
    }

    const changeItemCart = (data) => {
        dispatch(actionCart.changeQuantity(data));
    }

    if(carts.length === 0){
        return (
            <LayoutComponent>
                <h2>Chua co san pham trong gio hang</h2>
            </LayoutComponent>
        )
    }

    return (
        <LayoutComponent>
            <h5>This is the Cart Page</h5>
            {carts.map((item, index) => (
                <Row style={{ margin: '20px 0px', borderBottom: '1px solid #ccc'}} key={index}>
                    <Col span={4}>
                        <Image src={item.image} />
                    </Col>
                    <Col span={20} style={{padding: '30px'}}>
                        <h2>{item.title}</h2>
                        <p>Price: {item.price}</p>
                        <InputNumber
                            min={1}
                            max={10}
                            value={item.qty}
                            onChange={(val)=> changeItemCart({id: item.id, quantity: val})}
                        />
                        <Button
                            type="dashed"
                            danger style={{marginLeft: '10px'}}
                            onClick={()=> deleteItemCart(item.id)}
                        > Remove </Button>
                        <br/>
                        <p>Money: {parseFloat(item.price)*item.qty}</p>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col span={24}><h2>Total money : {totalMoney}</h2> </Col>
            </Row>
        </LayoutComponent>
    )
}
export default React.memo(CartPage);