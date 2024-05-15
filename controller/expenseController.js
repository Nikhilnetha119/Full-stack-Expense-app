const Expense = require('../model/expense')
const path = require('path')
const rootDir = require('../util/path');


exports.getExpense = (req, res) => {
    Expense.findAll().then((expense) => {
        res.send(expense);
    }).catch(err => console.log(err))
}

exports.getBookingList = (req, res, next) => {
    res.sendFile(path.join(rootDir,"view", "index.html"));
  };  

exports.createExpense = (req, res) => {
    const { name, price, description } = req.body;
    Expense.create({
        name: name,
        price: price,
        description: description
    }).then((response) => {
        res.send(response)
    }).catch(err => console.log(err))
}

exports.deleteExpense = (req, res) => {
    const expenseId = req.body.id;
    let obj = {}
    Expense.findAll({ where: { id: expenseId } }).then(([expense]) => {
        obj = { ...expense }
        return expense.destroy()
    }).then(() => {
        res.send(obj)
    }).catch(err => console.log(err))
}