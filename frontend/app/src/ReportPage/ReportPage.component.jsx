import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ReportPage.styles.css';

function ReportPage(){

    const {typeReport} = useParams();

    console.log(typeReport);

    const [carRecord, setCarRecord] = useState({});

    const navigate = useNavigate();

    const [dataAll, setDataAll] = useState([{
        shop_number: 0,
        shop_name: '',
        goods_name: '',
        price: 0,
        amount: 0,
    }]);

    const [dataShops, setDataShops] = useState([{
        number: 0,
        name: '',
        address: '',
        telephone: '',
        owner: '',
        total_goods_amount: 0,
    }])
    const [data2, setData2] = useState([{
        shop_name:'',
        potate: 0,
        juice: 0,
        chocolate: 0,
        milk: 0,
    }]);

    
    const [globalCount, setglobalCount] = useState({
        potate:0,
        juice: 0,
        chocolate:0,
        milk: 0,
    })


    useEffect(() => {
        if (typeReport === '1'){
            axios.get('http://localhost:8081/otchet-all-info-1')
        .then(res => {
            console.log(res);
            setDataAll(res.data);
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:8081/otchet-shop-info-1')
        .then(res => {
            console.log(res);
            setDataShops(res.data);
        })
        .catch(err => console.log(err));
        }
        if (typeReport === '2')
        {
            axios.get('http://localhost:8081/otchet-all-info-2')
            .then(res => {
                console.log(res);
                setData2(res.data);
            })  
            .catch(err => console.log(err));
        }
    }, []);

    useEffect(()=>{
        let potate = 0;
        let juice = 0;
        let chocolate = 0;
        let milk = 0;
        data2.forEach(element => {
            potate += element.potate;
            juice += element.juice;
            chocolate += element.chocolate;
            milk += element.milk;
        });
        setglobalCount({potate, juice, chocolate, milk});
    },[data2])

    return(
        <div>
            {typeReport === '1' && 
            <div>
                {dataShops.map((shop, index)=>{
                         return <div className="borders" style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', maxWidth:'400px', padding: '10px'}}>
                            <div style={{fontSize: '28px'}}>
                                {shop.name}
                            </div>
                            <div style={{marginBottom: '10px'}}>
                            {'Адрес - '+ shop.address + '; '}
                            {'Телефон - '+ shop.telephone}
                            </div>    
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Название товара</th>
                                            <th>Количество товара</th>
                                            <th>Цена</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {dataAll.filter((e)=>e.shop_name===shop.name).map((goods, index)=>{
                                    return  <tr>
                                                <td>{goods.goods_name}</td>
                                                <td>{goods.amount}</td>
                                                <td>{goods.price}</td>   
                                        </tr>})}
                                    </tbody>                                    
                                </table>                                                                     
                            <div style={{marginTop:'10px'}}>
                                итого:{shop.total_goods_amount}
                            </div>
                         </div>
                    })}
            </div>
            }
        {
            typeReport === '2' &&
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="borders">Название Магазина</th>
                            <th className="borders">potate</th>
                            <th className="borders">juice</th>
                            <th className="borders">chocolate</th>
                            <th className="borders">milk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data2.map((shop, index)=>{
                            return <tr>
                                    <td className="borders">{shop.shop_name}</td>
                                    <td className="borders">{shop.potate}</td>
                                    <td className="borders">{shop.juice}</td>
                                    <td className="borders">{shop.chocolate}</td>
                                    <td className="borders">{shop.milk}</td>
                                </tr>
                            
                        })}
                        <tr>
                            <td>Итого</td>
                            <td>{globalCount.potate}</td>
                            <td>{globalCount.juice}</td>
                            <td>{globalCount.chocolate}</td>
                            <td>{globalCount.milk}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    
                </div>
            </div>
        }
        </div>
    );
}

export default ReportPage;