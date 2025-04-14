const validateFields = (fields) => (req, res, next) => {
    for (const field of fields) {
        if (!req.body[field]) {
            const error = new Error(`Missing required field: ${field}`);
            error.statusCode = 400;
            throw error;
        }
    }
};

const validateParam = (paramName) => (req, res, next) => {
    if (!req.params[paramName]) {
        const error = new Error('Missing required route parameter');
        error.statusCode = 400;
        throw error;
    }
};

module.exports = { validateFields, validateParam };