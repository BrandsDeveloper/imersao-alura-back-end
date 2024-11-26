import { getAllPosts, createPost, updatePost } from "../models/postModels.js"
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

const posts = await getAllPosts();

async function listPosts(req, res) {
    res.status('200').json(posts);
}

async function mostrarPost(req, res) {
    const index = posts.findIndex( (post) => {
        return post.descricao === String(req.params.desc)
    })
    res.status('200').json(posts[index]);
};

async function postarNovo(req, res) {
    const newPost = req.body;

    try{
        const postCriado = await createPost(newPost);
        res.status(200).json(postCriado)
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
    
};

async function subirImage(req, res) {

    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try{
        const postCriado = await createPost(newPost);
        const imageUpdate = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imageUpdate)

        res.status(200).json(postCriado)
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

async function atualizarNovo(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;
    
    try{
        
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        
        const desc = await gerarDescricaoComGemini(imageBuffer);
    
        const postAtualizado = {
            imgUrl: urlImage,
            descricao: desc,
            alt: req.body.alt
        }

        const postCriado = await updatePost(id, postAtualizado);

        res.status(200).json(postCriado)
        
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
    
};

export { listPosts, mostrarPost, postarNovo, subirImage, atualizarNovo };