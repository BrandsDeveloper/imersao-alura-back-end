import express from "express";
import routes from "./src/routes/postRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
    console.log('Servidor escutando...');
});



// const posts = [
//     {
//         id: 0,
//         descricao: "Uma foto teste",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 1,
//         descricao: "Meu cachorro fazendo a pose mais fofa!",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 2,
//         descricao: "A gata mais preguiçosa do mundo.",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 3,
//         descricao: "Passeio no parque com o meu coelho.",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 4,
//         descricao: "O hamster mais rápido que já vi!",
//         imagem: "https://placecats.com/millie/300/150",
//     }
// ];






