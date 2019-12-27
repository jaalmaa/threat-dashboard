// initialize express router
const router = require('express').Router();

// set default api response
router.get('/', (req, res) => {
    res.send({
        'status': 'success',
        'data': 'Welcome to ITID API'
    });
});

// export routes
module.exports = router;