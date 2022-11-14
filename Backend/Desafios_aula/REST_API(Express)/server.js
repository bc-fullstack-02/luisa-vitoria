const express = require('express');
const app = express();

app.use(express.json());

let db = [
    {id: '04684059-776c-41ce-8c38-940830c0b651', title: 'hello1', body: 'hello1 world body blablabla', create_at: new Date(), update_at: new Date()},
    {id: '04684059-776c-41ce-8c38-940830c0b652', title: 'hello2', body: 'hello2 world body blablabla', create_at: new Date(), update_at: new Date()},
    {id: '04684059-776c-41ce-8c38-940830c0b653', title: 'hello3', body: 'hello3 world body blablabla', create_at: new Date(), update_at: new Date()},
    {id: '04684059-776c-41ce-8c38-940830c0b654', title: 'hello4', body: 'hello4 world body blablabla', create_at: new Date(), update_at: new Date()}
]

app.get('/posts', (req, res) => {
    res.send(db);
});

app.get('/posts/:id', (req, res) => {
    const ret = db.find(e => e.id === req.params.id);
    if(ret) {
        res.send(ret);
    }else {
        res.status(404).end();
    }
})

app.post('/posts', (req, res) => {
    db.push(req.body);
    res.status(201);
    res.end();
})

app.put('/posts/:id', (req, res) => {
    const ret = db.find(e => e.id === req.params.id);
    if(ret) {
        db[db.indexOf(ret)] = req.body;
        res.status(202).end();
    } else {
        res.status(404).end();
    }
})

app.delete('/posts/:id', (req, res) => {
    const ret = db.find(e => e.id === req.params.id);
        if (ret) {
            db = db.filter(e => e.id !== req.params.id);
            res.status(204);
            res.end();
        } else {
            res.status(404).end();
        }
})

app.listen(4000, () => {
  console.log(`Running on http://localhost:4000`);
});