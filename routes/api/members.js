const express = require ('express');
const uuid = require ('uuid');
const router = express.Router();
const members = require('../../Members');

//get all members
router.get('/',  (req, res) => {
    res.json(members);
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//get single member
router.get('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member  => member.id === parseInt(req.params.id));
    if (found){
        res.json(members.filter(members  => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `member with id ${req.params.id} not found`})
    }
});

//create member
router.post('/', (req, res) => {
    //res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name : req.body.name,
        status : 'active'
    }
    if(!newMember.name){
        return res.status(400).json({msg : 'please include the name'});
    }
    //members.save(newMember) with database
    members.push(newMember);
    res.json(members);//members with new one or
    //res.redirect('/');

});

//update member
router.put('/:id', (req, res) => {
    
    const found = members.some(member  => member.id === parseInt(req.params.id));
    if (found){
        const upMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name=upMember.name ? upMember.name:member.name;

                res.json({msg : 'the memnber was updated', member});
            }
        });
    }else{
        res.status(400).json({msg: `member with id ${req.params.id} not found`})
    }
});

//delete a member
//get single member
router.delete('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member  => member.id === parseInt(req.params.id));
    if (found){
        res.json({ msg: 'Member deleted', members: members.filter(member  => member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({msg: `member with id ${req.params.id} not found`})
    }
});

module.exports = router;

