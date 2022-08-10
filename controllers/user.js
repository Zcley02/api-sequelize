const User = require('../models').User;

const getAllUsers =  async (req, res) => {
    try {
        
        const user = await User.findAll();

        return res.json(user);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getAllUsers
}