import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddCar(){

    // добавить параметр на тип - изменение или добавление, при добавлении откидываем запрос на получение списка доступных товаров для данного магазина  

    const {shop_number} = useParams();
    const {goods_amount} = useParams();
    const {goods_price} = useParams();
    const {goods_number} = useParams();

    console.log(goods_amount, goods_price, goods_number, shop_number);

    const [carRecord, setCarRecord] = useState({
        mark:'',
        model: '',
        power: null,
        year: '',
        number: '',
    })
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/add', carRecord)
        .then(res =>{
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={onSubmit}>
            <div>
                <label>марка</label>
                <input type="text" placeholder="название марки" onChange={e => setCarRecord({...carRecord, mark: e.target.value})}></input>
            </div>
            <div>
                <label>Модель</label>
                <input type="text" placeholder="название модели" onChange={e => setCarRecord({...carRecord, model: e.target.value})}></input>
            </div>
            <div>
                <label>Мощность, лс</label>
                <input type="text" placeholder="мощность" onChange={e => setCarRecord({...carRecord, power: e.target.value})}></input>
            </div>
            <div>
                <label>Год выпуска</label>
                <input type="number" placeholder="год" onChange={e => setCarRecord({...carRecord, year: e.target.value})}></input>
            </div>
            <div>
                <label>Регистрационный номер</label>
                <input type="text" placeholder="рег номер" onChange={e => setCarRecord({...carRecord, number: e.target.value})}></input>
            </div>
            <button type="submit">Добавить</button>
        </form>
    );
}

export default AddCar;