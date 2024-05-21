import express from 'express';
import mysql from 'mysql';
import cors from 'cors'

const app = express();
app.use(cors());

// принудительное преобразование данных в json
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lab5',
});



db.connect(function (err) {
    if (err)
        console.log(err);
    else {
        console.log('succesful connetion to database...');
        //db.query(query, (err, res)=>{console.log(res)});
    }
})

//api

// Получит список ТС
app.get('/get', (req, res) => {
    const sql = `
    SELECT 
    s.number AS shop_number,
    s.name AS shop_name,
    s.address AS shop_address,
    SUM(ga.amount) AS total_goods_count,
    SUM(ga.amount * ga.price) AS total_goods_price
    FROM Shops s
    LEFT JOIN Goods_availability ga ON s.number = ga.number_shop
    GROUP BY s.number, s.name, s.address;
    `;
    const id = req.params.id;
    if (id)
        console.log('id get - ', id);
    db.query(sql, (err, result) => {
        if (err)
            return res.json({ Message: "Error server" });
        return res.json(result);
    })
});

// Карточка ТС
app.get('/card/:id', (req, res) => {
    const id = req.params.id;
    if (id)
        console.log('id get - ', id);
        const sql = `
        SELECT 
          g.number AS goods_number,
          g.name AS goods_name,
          ga.amount AS goods_amount,
          ga.price AS goods_price
        FROM Goods g
        JOIN Goods_availability ga ON g.number = ga.number_goods
        WHERE ga.number_shop = ${id};
      `;
    db.query(sql, [id], (err, result) => {
        if (err)
            return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

// Список доступных товаров
app.get('/additional-goods/:id', (req, res) => {
    const id = req.params.id;
    if (id)
        console.log('id get - ', id);
        const sql = `
        SELECT g.number AS goods_number, g.name AS goods_name
        FROM Goods g
        WHERE g.number NOT IN (
            SELECT ga.number_goods
            FROM Goods_availability ga
                WHERE ga.number_shop = ${id}
        );
      `;
    db.query(sql, [id], (err, result) => {
        if (err)
            return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

// добавить метод на удаление, добавление, изменение наличия  - по аналогии...



// Добавить ТС
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO Lab5.Goods_availability (number_shop, number_goods, amount, price) VALUES (?);';
    const values = [
        req.body.number_shop,
        req.body.number_goods,
        req.body.amount,
        req.body.price,
    ];
    db.query(sql, [values], (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

//Изменить наличие
app.post('/update/:shop_number/:goods_number', (req, res) => {
    const number_shop = req.params.shop_number;
    const number_goods = req.params.goods_number;
    const sql = `
    UPDATE Lab5.Goods_availability
    SET amount = ${req.body.amount},
        price = ${req.body.price}
    WHERE number_shop = ${number_shop}
    AND number_goods = ${number_goods};
    `;
    const id = req.params.id;
    db.query(sql, [req.body.amount, req.body.price, number_shop, number_goods], (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

//Удалить наличие товара

app.delete('/delete/:shop_number/:goods_number', (req, res) => {
    const shop_number = req.params.shop_number;
    const goods_number = req.params.goods_number;
    const sql = `
    DELETE FROM Lab5.Goods_availability
        WHERE number_shop = ${shop_number}
        AND number_goods = ${goods_number};`;
    db.query(sql, [shop_number, goods_number], (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    })
})

// Добавить метод на получение списка доступных товаров для данного магазина

app.listen(8081, () => {
    console.log("listening...");
})