const axios = require('axios');

class PokemonController {
    static async getPokemon(req, res) {
        try {
            const pokemonId = req.params.id
            const result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
            res.status(200).json(result.data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getTypePokemon(req, res) {
        try {
            const result = await axios.get("https://pokeapi.co/api/v2/type/")
            res.status(200).json(result.data)
           
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getRandomPokemon(req,res) {
        //Random ID Pokemon from 1 - 898 which the response API's available on the API
        const randomId = Math.floor(Math.random() * 898) + 1
        try {
            const result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + randomId)
            res.status(200).json(result.data)
        } catch (error) {
            res.status(400).json(error)
        }
    }


    static async getTypePokemonId(req, res) {
        try {
            const result = await axios.get("https://pokeapi.co/api/v2/type/" + req.params.id)
            res.status(200).json(result.data)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = PokemonController