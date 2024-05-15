const express = require('express')
const path = require('path');

const router = express.Router();
const expenseController = require('../controller/expenseController')

router.get('/', expenseController.getBookingList)

router.get('/get-expense', expenseController.getExpense)

router.post('/add-expense', expenseController.createExpense)

router.post('/delete-expense', expenseController.deleteExpense)

module.exports = router;
