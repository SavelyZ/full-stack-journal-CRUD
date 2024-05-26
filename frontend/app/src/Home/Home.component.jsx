import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Home.styles.css';
import { Link } from "react-router-dom";

function Home(){
    const [data, setData] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [dataSeacrhed, setDataSearched] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/get')
        .then(res=>{
            console.log(res.data)
            setData(res.data);
            setDataSearched(res.data);
        })
        .catch(err=>console.log(err))
    },[]);

    const doSearch = () => {
        console.log(valueSearch);
        if(valueSearch !== ''){
            setDataSearched(data.filter((e)=>e.shop_name.toLowerCase().includes(valueSearch.toLowerCase())))
            setValueSearch('');
        }
    }

    return(
        <div style={{textAlign: "center", maxWidth:'750px'}}>
            <div className="borders" style={{display:'flex', width:'93.5%', marginTop:'10px', marginBottom: '10px', alignItems:'left', padding:'20px'}}>
                <label style={{width:'220px', marginRight:'10px'}}>Поиск по названию магазина</label>
                <input type="text" value={valueSearch} style={{marginRight:'10px', width:'50%'}} onChange={e => setValueSearch(e.target.value)}/>
                <button onClick={doSearch}>Искать</button>
                <button onClick={() => setDataSearched(data)} style={{marginLeft: '10px'}}>Все</button>
            </div>
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
                    {dataSeacrhed.map((shop, index)=>{
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