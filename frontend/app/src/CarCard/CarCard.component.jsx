import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function CarCard(){

    const {id} = useParams();

    const [carRecord, setCarRecord] = useState({
        mark:'',
        model: '',
        power: null,
        year: '',
        number: '',
    });

    useEffect(() => {
        console.log('id - ',id)
        axios.get('http://localhost:8081/card/'+id)
        .then(res => {
            console.log(res);
            setCarRecord({...carRecord, mark:res.data[0].mark, model:res.data[0].model, power: res.data[0].power, year: res.data[0].year, number: res.data[0].number});
            console.log(carRecord);
        })
        .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log('click update');
        e.preventDefault();
        axios.post('http://localhost:8081/update/'+id, carRecord)
        .then(res =>{
            console.log('update', res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={onSubmit}>
            <div>
                <label>марка</label>
                <input type="text" placeholder="название марки" value={carRecord.mark} onChange={e => setCarRecord({...carRecord, mark: e.target.value})}></input>
            </div>
            <div>
                <label>Модель</label>
                <input type="text" placeholder="название модели" value={carRecord.model} onChange={e => setCarRecord({...carRecord, model: e.target.value})}></input>
            </div>
            <div>
                <label>Мощность, лс</label>
                <input type="text" placeholder="мощность" value={carRecord.power} onChange={e => setCarRecord({...carRecord, power: e.target.value})}></input>
            </div>
            <div>
                <label>Год выпуска</label>
                <input type="number" placeholder="год" value={carRecord.year} onChange={e => setCarRecord({...carRecord, year: e.target.value})}></input>
            </div>
            <div>
                <label>Регистрационный номер</label>
                <input type="text" placeholder="рег номер" value={carRecord.number} onChange={e => setCarRecord({...carRecord, number: e.target.value})}></input>
            </div>
            <button type="submit">Сохранить</button>
            <button onClick={()=> navigate('/')}>Назад</button>
        </form>
    );
}

export default CarCard;