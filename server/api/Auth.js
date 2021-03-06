const router = require('express').Router();
const { User } = require('../db//models');

//Login
router.post('/', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (!user) {
                const error = new Error();
                error.status = 401;
                throw error;
            }
            req.session.user = user;
            if (req.body.rememberme === true) {
                req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
            }
            res.send(user);
        })
        .catch(next);
});

//Logout
router.delete('/', (req, res, next) => {
    req.session.destroy(() => res.sendStatus(204));
});

//Get session UUID and return
router.get('/', (req, res, next) => {
    if (req.session.user) {
        res.send(req.session.user)
    } else {
        return next;
    }
});


module.exports = router;
