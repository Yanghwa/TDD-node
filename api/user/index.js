// route
const express = require('express');
const router = express.Router();

let users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'hey'},
    {id: 3, name: 'therr'}
];

router.get('/', (req, res) =>{
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
    // res.send('users list\n');
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    const user = users.filter(user => user.id === id)[0];
    if(!user) return res.status(404).end();
    res.json(user);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
});

router.post('/', (req, res) => {
    const name = req.body.name;
    if(!name) return res.status(400).end();
    const isDuplicated = users.filter(user => user.name === name).length
    if(isDuplicated) return res.status(409).end();
    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
});

router.put('/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name;
    if(!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if(isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if(!user) return res.status(404).end();
    user.name = name;
    
    res.json(user);
});

module.exports = router;