import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import { Favorite } from './models/FavoriteModel';

const app = new Koa();
const router = new Router({prefix: '/api'});
const db = mongoose.connection;
const host = "mongodb://127.0.0.1:27017/movies";

mongoose.connect(host, {
    autoCreate: true
});


db.on('error', err => console.error('Error, DB not connected', err));
db.on('connected', () => console.log('connected to mongo'));
db.on('disconnect', () => console.log('Mongo is disconnected'));
db.on('open', () => console.log('Connection Made!'));

app.use(router.allowedMethods())
    .use(router.routes())
    .use(cors());


router.get('/favorites', async ctx => {
    ctx.body = await Favorite.find();
});

router.post('/favorites/:id', async  ctx => {
    const favorite = new Favorite({
        id: ctx.params.id
    });
    ctx.body = await favorite.save();
});

router.delete('/favorites/:id', async ctx => {
    const fav = await Favorite.findOne({id: ctx.params.id});
    ctx.body = await fav.delete();
});

app.listen(3000);