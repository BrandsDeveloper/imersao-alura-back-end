import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

async function getAllPosts() {
    const db = conexao.db('imersao-back');
    const colecao = db.collection('posts');
    return colecao.find().toArray();
}

async function createPost(novoPost) {
    const db = conexao.db('imersao-back');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost);
}

async function updatePost(id, atualizarPost) {
    const db = conexao.db('imersao-back');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:atualizarPost});
}

export { getAllPosts, createPost, updatePost };