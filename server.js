const fs = require('fs');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

function lerArquivo(res, tipo){
    try{
        const buffer = fs.readFileSync(`./src/${tipo}.html`);
        const page = Buffer.from(buffer).toString('utf-8');
        res.set('Content-Type', 'text/html');
        res.send(page);
    }catch(error){
        console.log("[INFO] Houve erro ler o arquivo", error);
    }
}

app.get("/pages/quadrado", function(req, res){
    lerArquivo(res, "quadrado");
});

app.get("/pages/triangulo", function(req, res){
    lerArquivo(res, "triangulo");
});

app.get("/pages/retangulo", function(req, res){
    lerArquivo(res, "retangulo");
});

app.get("/pages/circulo", function(req, res){
    lerArquivo(res, "circulo");
});

app.get("/pages/trapezio", function(req, res){
    lerArquivo(res, "trapezio");
});

app.post("/update", function(req, res){
    const file = req.body.base64;
    const name = req.body.file;
    try{
        const buffer = Buffer.from(file, 'base64').toString("utf-8");
        fs.writeFileSync("src/" + name, buffer);
        console.log(buffer);
    }catch(error){
        console.log("Não foi possível salvar");
    }
});

app.listen(port, () => console.log("Connectado", port));