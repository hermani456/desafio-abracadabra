const express = require('express')
const app = express()

app.use(express.static('assets'))

const data = {
   usuarios: ['juan', 'pedro', 'maria', 'jose', 'astrid', 'javier']
}

app.get('/abracadabra/usuarios', (req, res) => {
	res.send(data)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
	const findUser = data.usuarios.find((usuario) => usuario === req.params.usuario)
	if (findUser) {
		next()
	} else {
		res.redirect('/who.jpeg')
	}
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
	res.redirect('/')
})

app.get('/abracadabra/conejo/:n', (req, res) => {
	const n = Math.floor(Math.random() * 4) + 1
	const numero = Number.parseInt(req.params.n)
	if (numero === n) {
		res.redirect('/conejito.jpg')
	} else {
		res.redirect('/voldemort.jpg')
	}
})

app.get('/voldemort.jpg', (req, res) => {
   res.redirect('/')
})

app.get('*', (req, res) => {
	res.send('<center><h1>Esta página no existe...!</h1> </center>')
})

app.listen(3000, () => {
	console.log('Server is running at http://localhost:3000')
})
