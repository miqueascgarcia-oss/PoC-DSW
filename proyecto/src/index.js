const express = require("express");
const axios = require("axios");
const _ = require("lodash");
const chalk = require("chalk");

const app = express();
const PORT = 3000;

const productos = [
    { id: 1, nombre: "Teclado", categoria: "Periféricos", precio: 25000 },
    { id: 2, nombre: "Mouse", categoria: "Periféricos", precio: 15000 },
    { id: 3, nombre: "Monitor", categoria: "Monitores", precio: 180000 },
    { id: 4, nombre: "Notebook", categoria: "Computadoras", precio: 950000 }
];

app.get("/", (req, res) => {
    res.json({
        mensaje: "PoC npm vs pnpm",
        estado: "funcionando"
    });
});

app.get("/productos", (req, res) => {
    const categorias = _.groupBy(productos, "categoria");

    res.json({
        cantidad: productos.length,
        productos,
        categorias
    });
});

app.get("/externo", async (req, res) => {
    try {
        const respuesta = await axios.get(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        res.json({
            origen: "API externa",
            datos: respuesta.data
        });
    } catch (error) {
        res.status(500).json({
            error: "No se pudo acceder a la API externa"
        });
    }
});

app.listen(PORT, () => {
    console.log(
        chalk.green(`Servidor ejecutándose en http://localhost:${PORT}`)
    );
});