const express = require('express')
const router = express.Router()
const fs = require('fs')
const bytes = fs.readFileSync('repo/terms.json')
const updateTermValidator = require('../validators.js/updateTerm.validator')
const validateBodyMiddleware = require('../middlewares/validateBody.middleware')

const routeName = '/terms'

router.put(`${routeName}`,
updateTermValidator,
validateBodyMiddleware,
(req, res, next) =>  {
    
    try{

        let data = JSON.parse(bytes);

        let termIndex = data.findIndex(item => item.en.trim().toLowerCase() == req.body.from.trim().toLowerCase())
    
        if(termIndex === -1) return res.status(404).send({message : "Term not found."})
    
        data[termIndex].ar = req.body.to
    
        fs.writeFileSync('repo/terms.json', JSON.stringify(data));
    
        return res.send(data[termIndex])

    } catch(err) {
        return res.status(500).send({message : "Something went wrong"})
    }

})

module.exports = router
