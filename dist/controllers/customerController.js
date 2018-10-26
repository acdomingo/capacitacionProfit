"use strict";
const customerController = {
    list(req, res) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM customers', (err, rows) => {
                if (err) {
                    res.json(err);
                }
                console.log(rows);
                res.render('customers');
            });
        });
    }
};
module.exports = customerController;
