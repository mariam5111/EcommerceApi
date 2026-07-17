
const express = require('express');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


dotenv.config();


const app = express();


app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechMaster E-Commerce API (Phase 1 / Sprint 1) - All Routes Registered!"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
});