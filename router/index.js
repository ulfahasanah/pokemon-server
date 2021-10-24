const router = require('express').Router()
const PokemonController = require('../controllers/PokemonController')
const checkJwt = require('../middlewares/checkJwt')

router.use(checkJwt)

router.get('/api/v1/pokemon', PokemonController.getRandomPokemon)
router.get('/api/v1/pokemon/type', PokemonController.getTypePokemon)
router.get('/api/v1/pokemon/:id', PokemonController.getPokemon)
router.get('/api/v1/pokemon/type/:id', PokemonController.getTypePokemonId)


module.exports = router