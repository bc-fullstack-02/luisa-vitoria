const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const { Client } = require('pg');
const { runInNewContext } = require('vm');

app.use(express.json());


function conn() {
    const client = new Client({
        connectionString: "postgresql://postgres:postgres@localhost:5432/postgres"
    })
    return client.connect()
    .then(() => {
        return client
    })
}

router
    .route('/posts')
    .all((req, res, next) => {
        return conn()
        .then(client => {
            req.db = client
            next()
        })
    })
    .get((req, res) => {
        req.db.query("SELECT id, title, body FROM public.posts;")
        .then(data => {
            res.send(data.rows)
        })
        .catch(e => {
            console.error(e)
            res.status(500).end()
        })
    })
    .post((req, res) => {
        const { id, title, body} = req.body

        req.db.query("INSERT INTO public.posts (id, title, body) VALUES($1, $2, $3);", [id, title, body])
        .then(data => {
            res.status(201);
        })
        .catch(e => {
            console.error(e)
            res.status(500).end()
        })
    })

router
    .param("id", (req, res, next, id) => {
        console.log(id);
        return conn()
        .then((client) => {
            req.db = client
            next()
        })
    })
    .route('/posts/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
       
        req.db.query('SELECT * FROM public.posts WHERE id = $1', [id])
        .then(data => {
            console.log(data)
            res.send(data.rows[0])
        })
        .catch(e => {
            console.error(e)
            res.status(404).end()
        })
    })
    .put((req, res) => {
        const id = req.params.id;
        const { title, body } = req.body;

        req.db.query('UPDATE public.posts SET title = $1, body = $2 WHERE id = $3',[title, body, id])
        .then(data => {
            res.status(202).send(`user modified with id: ${id}`)
        })
        .catch(e => {
            console.error(e)
            res.status(404).end()
        })
    })
    .delete((req, res) => {
        const id = req.params.id;
        req.db.query('DELETE FROM public.posts WHERE id = $1', [id])
        .then(data => {
            res.status(204).send(`User deleted with id: ${id}`)
        })
        .catch(e => {
            console.error(e)
            res.status(404).end()
        })
    })

app.use(router);

app.listen(5000, () => {
  console.log(`Running on http://localhost:5000`);
});
