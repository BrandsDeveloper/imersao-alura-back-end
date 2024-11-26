import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, mostrarPost, postarNovo, subirImage, atualizarNovo } from "../controllers/postControllers.js"

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption))

    app.get('/posts', listPosts);
    
    app.get('/posts/:desc', mostrarPost);

    app.post('/posts', postarNovo);

    app.post('/upload', upload.single('imagem'), subirImage)

    app.put("/upload/:id", atualizarNovo)

}

export default routes;