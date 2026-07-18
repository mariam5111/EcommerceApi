let categories = require('../data/categories');

exports.getAllCategories = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories
    });
};

exports.getCategoryById = (req, res) => {
    const id = req.validatedId; 
    const category = categories.find(c => c.id === id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: category
    });
};

exports.createCategory = (req, res) => {
   
    const { name } = req.body;

    const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;

    const newCategory = {
        id: newId,
        name
    };

    categories.push(newCategory);

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory
    });
};

exports.updateCategory = (req, res) => {
    const id = req.validatedId;
    const { name } = req.body; 

    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    categories[categoryIndex].name = name;

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: categories[categoryIndex]
    });
};

exports.deleteCategory = (req, res) => {
    const id = req.validatedId;
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    let products = require('../data/products');
    const initialProductCount = products.length;
    
    categories = categories.filter(c => c.id !== id);

    const remainingProducts = products.filter(p => p.categoryId !== id);
    const deletedProductsCount = initialProductCount - remainingProducts.length;
    
    products.length = 0;
    products.push(...remainingProducts);

    res.status(200).json({
        success: true,
        message: `Category and its ${deletedProductsCount} associated products deleted successfully`
    });
};