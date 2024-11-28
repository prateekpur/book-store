//import express from 'express';
//import bodyParser from 'body-parser';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001
app.use(cors());

let data = [
    { "id": 1, "name": "name_1", "description": "desc_1" }
];
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

app.get('/', function (req, res) {
    res.status(200).json(data);
});

app.get("/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.post('/', function (req, res) {
    let items = data.map(item => item.id);
    let newId = items.length > 0 ? Math.max.apply(Math, items) + 1 : 1;
    console.log("request body string: " + JSON.stringify(req.body));
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log("request : " + obj);
    let newItem = {
        id: newId,
        name: req.body.name,
        description: req.body.description
    }

    data.push(newItem);

    res.status(201).json({
        'message': "successfully created"
    });
});

app.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    console.log("Record found : " + found.id + ":" + found.name + ":" + found.description);
    console.log("Request body : " + JSON.stringify(req.body, null, 2));
    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            description: req.body.description
        };

        let targetIndex = data.indexOf(found);
        console.log("update data : " + updateData.id + ":" + updateData.name + ":" + updateData.description + " : index : " + targetIndex);

        data.splice(targetIndex, 1, updateData);

        res.status(201).json({ 'message': "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});

app.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
