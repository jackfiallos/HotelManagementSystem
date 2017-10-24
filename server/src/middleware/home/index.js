
'use strict';

/**
 * Routes
 */

const routes = [];

/**
 * GET /
 * Version: 1.0.0
 */
routes.push({
    meta: {
        name: 'home',
        method: 'GET',
        paths: [
            '/'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        res.send({
            message: 'please login'
        });

        return next();
    }
});

/**
* Export
*/

module.exports = routes;
