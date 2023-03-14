const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getGames, getNameId, postGames, getGenres } = require("./controllers");

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGames);
router.get("/videogames/name", getNameId);
router.get("/videogames/:id", getNameId);
router.get("/genres", getGenres);
router.post("/videogames", postGames);

module.exports = router;
