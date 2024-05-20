import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Home.styles.css';
import { Link } from "react-router-dom";

function Home(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8081/get')
        .then(res=>{
            console.log(res.data)
            setData(res.data);
        })
        .catch(err=>console.log(err))
    },[]);

    // const onDeleteClick = (id) => {
    //     axios.delete('http://localhost:8081/delete/'+id)
    //     .then(res =>{
    //      window.location.reload();
    //     })
    //     .catch(err => console.log(err))
    // }

    return(
        <div style={{textAlign: "center"}}>
            <table>
                <thead>
                    <tr>
                        <th className="borders">Название</th>
                        <th className="borders">Адрес</th>
                        <th className="borders">колличество товара</th>
                        <th className="borders">Общая цена товара в магазине</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((shop, index)=>{
                         return <tr key ={index}>
                                <td className="borders">{shop.shop_name}</td>
                                <td className="borders">{shop.shop_address}</td>
                                <td className="borders">{shop.total_goods_count}</td>
                                <td className="borders">{shop.total_goods_price}</td>
                                <td className="borders">
                                <div className="buttonContainer">
                                        <button><Link to={`/card/${shop.shop_number}/${shop.shop_name}`}>Изменить наличие товара</Link></button>
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
    )
}

export default Home;