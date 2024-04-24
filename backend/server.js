import  express  from 'express';
import mysql from 'mysql';
import cors from 'cors'

const app = express();
app.use(cors());

// принудительное преобразование данных в json
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'crud',
});


db.connect(function(err){
    if(err)
        console.log(err);
    else{
        console.log('succesful connetion to database...');
        db.query('show tables', (err, res)=>{console.log(res)});
    } 
})

//api

// Получит список ТС
app.get('/get', (req, res) => {
    const sql = 'SELECT * FROM car';
    const id = req.params.id;
    if (id)
    console.log('id get - ', id);
    db.query(sql, (err, result)=>{
        if (err)
            return res.json({Message: "Error server"});
        return res.json(result);
    })
});

// Карточка ТС
app.get('/card/:id', (req, res) => {
    const id = req.params.id;
    if (id)
        console.log('id get - ', id);
    const sql = 'SELECT * FROM car WHERE id = ?';
    db.query(sql,[id], (err, result) => {
        if(err) 
        return res.json({Message: "Error inside server"});
    return res.json(result);
    });
});

// Добавить ТС
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO car (`mark`, `model`, `power`, `year`, `number`) VALUES(?)';
    const values = [
        req.body.mark,
        req.body.model,
        req.body.power,
        req.body.year,
        req.body.number,
    ];
    db.query(sql, [values], (err, result) => {
        if(err)
            return res.json(err);
        return res.json(result);
    })
});

//Изменить ТС
app.post('/update/:id', (req, res) => {
    const sql = 'UPDATE car SET `mark`=?, `model`=?, `power`=?, `year`=?, `number`=?  WHERE id=?';
    const id = req.params.id;
    db.query(sql, [req.body.mark, req.body.model, req.body.power, req.body.year, req.body.number, id], (err, result) => {
        if(err)
            return res.json(err);
        return res.json(result);
    })
});

//Удалить ТС

app.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM car WHERE id=?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err)
            return res.json(err);
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("listening...");
})