const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

app.get('/', (req, res) =>{
    res.send("Ve al endpoint /alumnos para más información.")
})

app.get('/alumnos', (req, res) =>{
    fs.readFile('alumnos.json', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data))
      });
})
app.get('/api/estadisticas', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let objetoJsonNotas = []
        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento) => {
            objetoJsonNotas.push({
                "Media" : elemento.Promedio,
                "Nombre carrera": elemento.Carrera
            })
        });
        res.json(objetoJsonNotas)
    });
})
app.get('/api/estadisticas/:carrera', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let objetoJsonNotasCarrera = []
        let index
        const carrera = req.params.carrera
        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento, i) => {
            if (elemento.Carrera == carrera) {
                index = i
            }
        });
        objetoJsonNotasCarrera = {
            "Media": objetoJsonData[index].Promedio,
            "Nombre carrera": objetoJsonData[index].Carrera
        }
        res.json(objetoJsonNotasCarrera)
    });
})
app.get('/api/carrera/:carrera', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let objetoJsonNotasCarrera = []
        let index
        const carrera = req.params.carrera
        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento, i) => {
            if (elemento.Carrera == carrera) {
                index = i
            }
        });
        objetoJsonNotasCarrera = {
            "Nombre": objetoJsonData[index].Nombre, 
            "Nombre carrera": objetoJsonData[index].Carrera
        }
        res.json(objetoJsonNotasCarrera)
    });
})
app.get('/api/pagados', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let objetoJsonNotas = []
        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento) => {
            if (elemento.AlCorriente == true) {
                objetoJsonNotas.push({
                    "Nombre" : elemento.Nombre,
                    "Pagado": "Sí"
                })
            }
        });
        res.json(objetoJsonNotas)
    });
})
app.get('/api/nopagados', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let objetoJsonNotas = []
        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento) => {
            if (elemento.AlCorriente == false) {
                objetoJsonNotas.push({
                    "Nombre" : elemento.Nombre,
                    "Pagado": "No"
                })
            }
        });
        res.json(objetoJsonNotas)
    });
})
app.get('/api/:cuenta', (req, res) => {
    fs.readFile('alumnos.json', (err, data) => {
        const objetoJsonData = JSON.parse(data)
        let index
        let objetoJsonNotas = []
        const cuenta = req.params.cuenta

        if (err) {
            console.log(err);
            return;
        }
        objetoJsonData.forEach((elemento, i) => {
            if (elemento.Cuenta == cuenta) {
                index = i
            }
        });
        objetoJsonNotas = objetoJsonData[index]
        res.json(objetoJsonNotas)
    });
})

//Faltan POST, PUT y GET



app.listen(port, () => {
    console.log(`App iniciada en el puerto -> ${port}`);
})