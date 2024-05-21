import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './Addcar.styles.css';

function AddCar(){

    // добавить параметр на тип - изменение или добавление, при добавлении откидываем запрос на получение списка доступных товаров для данного магазина  

    const {shop_number} = useParams();
    const {goods_amount} = useParams();
    const {goods_price} = useParams();
    const {goods_number} = useParams();
    const {typePage} = useParams();

    console.log(goods_amount, goods_price, goods_number, shop_number, typePage);

    const [carRecord, setCarRecord] = useState({
        goods_amount: goods_amount,
        goods_price: goods_price,
        goods_name: '124',
        addGoods: [],
        addGood: {}
    })


    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if(typePage === '1')
        {
            //изменить
            axios.post('http://localhost:8081/update/'+shop_number+'/'+goods_number, { 
                amount: carRecord.goods_amount, 
                price: carRecord.goods_price
            })
            .then(res =>{
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err))
        }else{
            // добавить
            axios.post('http://localhost:8081/add/', {
                number_shop: shop_number,
                number_goods: carRecord.addGood, 
                amount: carRecord.goods_amount, 
                price: carRecord.goods_price
            })
            .then(res =>{
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if(typePage === '2'){
            axios.get('http://localhost:8081/additional-goods/'+shop_number)
            .then(res => {
                    setCarRecord({...carRecord, addGoods: [].concat(res.data)});
                    console.log(carRecord.addGoods);
            })
            .catch(err => console.log(err));
        }
    }, []);

    return(
        <form onSubmit={onSubmit}>
           {typePage === '1' && <>
            <div style={{fontWeight: "700", marginLeft:"30px"}}>
                Изменение наличия
            </div>
            <div className="container" style={{marginTop:"10px"}}>
                <label>Количество</label>
                <input type="number" value={carRecord.goods_amount} onChange={e => setCarRecord({...carRecord, goods_amount: e.target.value})}></input>
            </div>
            <div className="container" style={{marginTop:"10px"}}>
                <label>Цена, шт</label>
                <input type="number" value={carRecord.goods_price} onChange={e => setCarRecord({...carRecord, goods_price: e.target.value})}></input>
            </div>
            <button type="submit" style={{marginTop:"10px", marginLeft:"30px"}}>Изменить</button>
           </>}
           {typePage === '2' && <>
           <div style={{fontWeight: "700", marginLeft:"30px"}}>
                Добавить наличие
            </div>
            <div className="container" style={{marginTop:"10px"}}>
                <label>Название</label>
                <select value={carRecord.addGood} onChange={(e)=>{setCarRecord({...carRecord, addGood:e.target.value})}} style={{width:"170px"}}>
                    {carRecord.addGoods.map((elem)=>{return <option value={elem.goods_number}>{elem.goods_name}</option>})}
                </select>
            </div>
            <div className="container" style={{marginTop:"10px"}}>
                <label>Количество</label>
                <input type="number" value={carRecord.goods_amount} onChange={e => setCarRecord({...carRecord, goods_amount: e.target.value})}></input>
            </div>
            <div className="container" style={{marginTop:"10px"}}>
                <label>Цена, шт</label>
                <input type="number" value={carRecord.goods_price} onChange={e => setCarRecord({...carRecord, goods_price: e.target.value})}></input>
            </div>
            <button type="submit" style={{marginTop:"10px", marginLeft:"30px"}}>Добавить</button>
           </>}
        </form>
    );
}

export default AddCar;