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

    const onDeleteClick = (id) => {
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res =>{
         window.location.reload();
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Марка</th>
                        <th>Модель</th>
                        <th>Модность, лс</th>
                        <th>Год выпуска</th>
                        <th>Регистрационный номер</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((car, index)=>{
                         return <tr key ={index}>
                                <td>{car.mark}</td>
                                <td>{car.model}</td>
                                <td>{car.power}</td>
                                <td>{car.year}</td>
                                <td>{car.number}</td>
                                <td>
                                <div className="buttonContainer">
                                        <button><Link to={`/card/${car.id}`}>Изменить</Link></button>
                                        <button onClick={() => onDeleteClick(car.id)}>Удалить</button>
                                    </div>
                                </td>
                         </tr>
                    })}
                    <tr>
                        <button><Link to='/add'>Добавить</Link></button>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Home;