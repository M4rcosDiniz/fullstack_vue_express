const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/', async (req, res)=>{
    const posts = await LoadPostsColletion();
    res.send(await posts.find({}).toArray());
});

//Add Posts
router.post('/', async (req, res) => {
    const posts = await LoadPostsColletion();
    const resposta = await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Update Posts
router.put('/:id', async (req, res) => {
    const posts = await LoadPostsColletion();
    await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)}, { $set: {text: req.body.text} })
    res.status(200).send(await posts.find({_id: new mongodb.ObjectID(req.params.id)}).toArray());
});

//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await LoadPostsColletion();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(204).send();
});


//Função asyncrona que conecta ao banco mongo e configura a connection string e a collection que será retornada
async function LoadPostsColletion(){
const client = await mongodb.MongoClient.connect('mongodb+srv://VueExpress:abc123@@vueexpressapp.djgb9.mongodb.net', 
{ useNewUrlParser: true, useUnifiedTopology: true});
return client.db('vueexpressapp').collection('posts');
}


module.exports = router;