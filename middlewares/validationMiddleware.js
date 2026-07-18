
exports.validateCategoryBody = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category name is required and cannot be empty."
        });
    }

    next(); 
};

exports.validateProductBody = (req, res, next) => {
    const { name, price, categoryId } = req.body;

    if (!name || !price || !categoryId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields: name, price, and categoryId."
        });
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be a valid number greater than 0."
        });
    }

    next(); 
};