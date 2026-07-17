 

const express = require('express');
const dotenv = require('dotenv');


dotenv.config();


const app = express();


app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechMaster E-Commerce API (Phase 1 / Sprint 1)"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
});