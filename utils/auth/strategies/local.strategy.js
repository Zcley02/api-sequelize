const { Strategy } = require("passport-local");
const { login } = require("../../../controllers/auth.controller");


const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            
            const user = await login(email, password);
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;