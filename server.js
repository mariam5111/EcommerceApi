
const express = require('express');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


dotenv.config();


const app = express();


app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Can't find ${req.url} on this server!`
    });
});


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format in request body"
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});