import express from 'express';
import fs from 'fs';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const app = express();

const puerto = 8080;
let visitasItems = 0;
let visitasRandom = 0;

app.get('/', (req, res) => {
    console.log('request recibido!');
    res.json({ msg: 'hola mundo!' });
});

app.get('/item-random', (req, res) => {
    ++visitasRandom
    console.log('request recibido!');
    async function leer(file){ 
        try{
            const contenido = await fs.promises.readFile(file, 'utf-8')
            let contenidoObj = JSON.parse(contenido);
            const numeroRandom = getRandomInt(0, contenidoObj.length)
            let itemRandom = JSON.stringify(contenidoObj[numeroRandom]);
            res.send(`item:${itemRandom}`)
        }
        
        catch(err) {
            console.log('error');
            };
    }
    leer('./productos.txt')
});

app.get('/items', (req, res) => {
    console.log('request recibido!');
    ++visitasItems
    async function leer(file){ 
        try{
            const contenido = await fs.promises.readFile(file, 'utf-8')
            let contenidoObj = JSON.parse(contenido);
            let items = contenidoObj.map(el => el.title).join(', ');
            let totalProd = contenidoObj.length
            res.json(`{items: [${items}] cantidad: (${totalProd})}`)
        }
        
        catch(err) {
            console.log('error');
            };
    
    }
    leer('./productos.txt')

});

app.get('/visitas', (req, res) => {
    console.log('request recibido!');
    res.json(`Visitas items: ${visitasItems}, visitas Random: ${visitasRandom}`);
});

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});
