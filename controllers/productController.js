let products = require('../data/products');

exports.getAllProducts = (req, res) => {
    const { category } = req.query;
    let filteredProducts = products;

    if (category) {
        const categoryId = parseInt(category);
        filteredProducts = products.filter(p => p.categoryId === categoryId);
    }

    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        count: filteredProducts.length,
        data: filteredProducts
    });
};

exports.getProductById = (req, res) => {
    const id = req.validatedId || parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: `Product with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product
    });
};

exports.createProduct = (req, res) => {
    
    const { name, price, categoryId, inStock } = req.body;

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
        id: newId,
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        inStock: inStock !== undefined ? inStock : true
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
};

exports.updateProduct = (req, res) => {
   const id = req.validatedId || parseInt(req.params.id);
    const { name, price, categoryId, inStock } = req.body;

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Product with ID ${id} not found`
        });
    }

    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = parseFloat(price);
    if (categoryId) products[productIndex].categoryId = parseInt(categoryId);
    if (inStock !== undefined) products[productIndex].inStock = inStock;

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[productIndex]
    });
};

exports.deleteProduct = (req, res) => {
    const id = req.validatedId || parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Product with ID ${id} not found`
        });
    }

    products = products.filter(p => p.id !== id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
};