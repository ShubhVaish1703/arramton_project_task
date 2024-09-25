const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const PapaParse = require('papaparse');
const fileUpload = require('express-fileupload')
const fs = require('fs');
const DataModel = require('./dataSchema');

let { promisify } = require('util')
const readFile = promisify(fs.readFile);

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/save-data', async (req, res) => {
    if (!req.files || !req.files.csv) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded!"
        })
    }

    const csvfile = req.files.csv;

    if (csvfile.size === 0) {
        return res.status(400).json({
            success: false,
            message: "the file uploaded is empty!"
        })
    }

    const data = await readFile(csvfile.tempFilePath, 'utf8');

    // parse the csv data using papa-parse
    const results = PapaParse.parse(data, {
        header: true,
    });


    await DataModel.create({
        users: results?.data,
    });

    res.status(200).json({
        success: true,
        message: "file uploaded successfully!",
    })
});

app.get('/get-data', async (req, res) => {
    let data = await DataModel.find();

    let users = [];
    data.map((item) => {
        users.push(...item.users)
    })

    res.status(200).json({
        success: true,
        users
    })
});

connectDB().then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT, () => {
        console.log('app running on port: ', process.env.PORT);
    })
})