import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CarCard(){

    const {shop_number} = useParams();
    const {shop_name} = useParams();

    const [carRecord, setCarRecord] = useState({
        mark:'',
        model: '',
        power: null,
        year: '',
        number: '',
    });


    const [data, setData] = useState([{
        goods_amount:0,
        goods_name:'',
        goods_price: 0,
        goods_number:0,
    }]);

    useEffect(() => {
        console.log('id - ',shop_number)
        axios.get('http://localhost:8081/card/'+shop_number)
        .then(res => {
            console.log(res);
            setData(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log('click update');
        e.preventDefault();
        axios.post('http://localhost:8081/update/'+shop_number, carRecord)
        .then(res =>{
            console.log('update', res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    const onDeleteClick = (goods_number) => {
        axios.delete('http://localhost:8081/delete/'+shop_number+'/'+goods_number)
        .then(res =>{
        //  window.location.reload();
        })
        .catch(err => console.log(err))
    }

    return(
            <div style={{textAlign: "center"}}>
            {shop_name}
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество товара</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((goods, index)=>{
                         return <tr key ={index}>   
                                <td>{goods.goods_name}</td>
                                <td>{goods.goods_amount}</td>
                                <td>{goods.goods_price}</td>
                                <td>
                                <div className="buttonContainer">
                                <button><Link to={`/add/${shop_number}/${goods.goods_amount}/${goods.goods_price}/${goods.goods_number}`}>Изменить наличие</Link></button>
                                <button style={{marginLeft:'10px'}} onClick={() => onDeleteClick(goods.goods_number)}>Удалить наличие</button>
                                        {/* <button><Link to={`/card/${shop.shop_number}`}>Изменить наличие товара</Link></button> */}
                                        {/* <button onClick={() => onDeleteClick(car.id)}>Удалить</button> */}
                                    </div>
                                </td>
                         </tr>
                    })}
                    {/* <tr>
                        <button><Link to='/add'>Добавить</Link></button>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
}

export default CarCard;