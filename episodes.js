const mongodb = require('./mongo')

const getEpisodeByRoll = roll => new Promise((resolve, reject) => {
    let season = Math.floor(Math.random() * roll) + 1

    mongodb.getDocuments('episodes', { season: season })
    .then(res => {
        if (res && res.length !== 0) {
            let episode = Math.floor(Math.random() * res.length)

            resolve(res[episode])
        }

        return reject({ error: 'No hay tantas temporadas, perro.' })
    })
})

module.exports = {
    getEpisodeByRoll
}
