const { Router } = require('express')
const { getABook } = require('../controllers/book')

const router = Router()
router.get('/', getABook)

module.exports = router
