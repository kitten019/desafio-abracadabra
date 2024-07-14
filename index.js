// Rutas desafío
// 1.- Usuarios : http://localhost:3000/abracadabra/usuarios
// 2.- Voldemort :http://localhost:3000/abracadabra/conejo/:n
// 3.- Usuaria Lulu:  http://localhost:3000/abracadabra/juego/Lulu
// 4.- Usuario no registrado: http://localhost:3000/abracadabra/juego/Lu

import express from 'express'
import { authUsuarios } from './middleware/auth.middlware.usuario.js';


const app = express()
export const __dirname = import.meta.dirname;
export const usuarios = { usuarios: ["Pau", "Lulu", "Amanda", "Nicolás", "Nacho", "Kaeya", "Rem"] }

//Middleware
console.log(__dirname)
app.use('/abracadabra/juego/:usuario', authUsuarios, express.static(__dirname + '/public'));

//Rutas solicitadas
app.get('/abracadabra/usuarios', (req, res) => {
    return res.json(usuarios)
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroUsuario = parseInt(req.params.n)
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1

    if (numeroUsuario === numeroAleatorio) {
        res.sendFile(__dirname + '/public/assets/img/conejito.jpg')
    } else {
        res.sendFile(__dirname + '/public/assets/img/voldemort.jpg')
    }
})

//Rutas con errores de petición
app.get('/', (req, res) => {
    res.status(200).json({ method: "GET" })
})
app.post('/', (req, res) => {
    res.status(201).json({ method: "POST" })
})

app.use('*', (req, res) => {
    res.status(404).send(`Lo sentimos!, esta página no existe 😔`)
})

//Poner servidor en marcha

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`La aplicación se encuentra en el puerto http://localhost:${PORT}/`)
})