const db = require("../data/pokedex.json");

function findPokemonByName(name) {
    const data = db.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (!data) {
        return null;
    }
    return data;
}

function getPokemonInformations(req, res) {
    console.log("getPokemonInformations", { body: req.body, headers: req.headers })
    const pokemon = req.body.pokemon;
    const pokemonInfos = findPokemonByName(pokemon);
    if (!pokemonInfos) {
        res.json({
            replies: [{
                type: "text",
                content: `no conozco el pokemon llamado ${pokemon} :(`,
            }, ],
        });
    } else {
        res.json({
            replies: [
                { type: "text", content: `${pokemonInfos.id}` },
                { type: "text", content: `${pokemonInfos.name}` },
                {
                    type: "text",
                    content: `Tipos: ${pokemonInfos.types.join(" and ")}`,
                },
                {
                    type: "text",
                    content: `Altura: ${pokemonInfos.height}`,
                },
                {
                    type: "text",
                    content: `Peso: ${pokemonInfos.weight}`,
                },
                {
                    type: "text",
                    content: `Experiencia base: ${pokemonInfos.base_experience}`,
                },
                { type: "text", content: `Descripcion: ${pokemonInfos.description}` },
                { type: "picture", content: pokemonInfos.image },


            ],
        });
    }
};



function getPokemonEvolutions(req, res) {
    console.log("getPokemonEvolutions", { body: req.body, headers: req.headers });
    const pokemon = req.body.pokemon;
    const pokemonInfos = findPokemonByName(pokemon);
    if (!pokemonInfos) {
        res.json({
            replies: [{
                type: "text",
                content: `no conozco el pokemon llamado ${pokemon} :(`,
            }, ],
        });
    } else if (pokemonInfos.evolutions.length === 1) {
        res.json({
            replies: [
                { type: "text", content: `${pokemonInfos.name} has no evolutions.` },
            ],
        });
    } else {
        res.json({
            replies: [
                { type: "text", content: `${pokemonInfos.name} family` },
                {
                    type: "text",
                    content: pokemonInfos.evolutions

                },
                {
                    type: "card",
                    content: {
                        title: "Ver mas de este",
                        buttons: pokemonInfos.evolutions
                            .filter((p) => p.id !== pokemonInfos.id) // Remove initial pokemon from list
                            .map((p) => ({
                                type: "postback",
                                title: p.name,
                                value: `Dime mas de ${p.name}`,
                            })),
                    },
                },
            ],
        });
    }
};


module.exports = { getPokemonInformations, getPokemonEvolutions };