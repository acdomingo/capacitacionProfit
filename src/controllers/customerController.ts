import express = require('express');
import mysql = require ('mysql');


const customerController = {
    list (req:express.Request, res:express.Response) {
        if (req.getConnection) {
            req.getConnection ( (err:mysql.MysqlError, conn:mysql.Connection) => {
                conn.query ('SELECT * FROM customers', (err:mysql.MysqlError, rows:any) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('customers', {
                        data: rows,
                    });
                });
            });
        }
    },

    save (req:express.Request, res:express.Response) {
        const data:any = req.body;
        if (req.getConnection) {
            req.getConnection ( (err:mysql.MysqlError, conn:mysql.Connection) => {
                conn.query ('INSERT INTO customers set ?', [data], (err:mysql.MysqlError, rows:any) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/');
                });
            });
        }
    },

    edit (req:express.Request, res:express.Response) {
        const id:number = req.params.id;
        if (req.getConnection) {
            req.getConnection ( (err:mysql.MysqlError, conn:mysql.Connection) => {
                conn.query ('SELECT * FROM customers WHERE id = ?', [id], (err:mysql.MysqlError, rows:any) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('customers_edit', {
                        data : rows[0],
                    })
                });
            });
        }
    },

    update (req:express.Request, res:express.Response) {
        const id:number = req.params.id;
        const data:any = req.body;
        if (req.getConnection) {
            req.getConnection ( (err:mysql.MysqlError, conn:mysql.Connection) => {
                conn.query ('UPDATE customers set ? WHERE id = ?', [data, id], (err:mysql.MysqlError, rows:any) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/');
                });
            });
        }
    },

    delete (req:express.Request, res:express.Response) {
        const id:number = req.params.id;
        if (req.getConnection) {
            req.getConnection ( (err:mysql.MysqlError, conn:mysql.Connection) => {
                conn.query ('DELETE FROM customers WHERE id = ?', [id], (err:mysql.MysqlError, rows:any) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/');
                });
            });
        }
    }
}

export = customerController;
