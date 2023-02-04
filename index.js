const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')
app.use(express.json())

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    res.send(canciones);
});

app.get('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    const cancion = canciones.find((p) => p.id == id);
    res.send(cancion);
});

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    const index = canciones.findIndex((p) => p.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Cancion eliminada con éxito');
});

app.put('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    const index = canciones.findIndex((p) => p.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Cancion modificada con éxito');
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.post("/canciones", (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    canciones.push(cancion)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Cancion agregado con éxito!")
    })
    
