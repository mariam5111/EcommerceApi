
let categories = require('../data/categories');


exports.getAllCategories = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories
    });
};

exports.getCategoryById = (req, res) => {
    const id = parseInt(req.params.id);
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

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Category name is required"
        });
    }


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
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Category name is required for update"
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
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }


    categories = categories.filter(c => c.id !== id);

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
};