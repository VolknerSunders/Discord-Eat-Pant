const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = '' // TODO: Add to env.
const dbName = 'bot'

/**
 * 
 * @param {Object} document El objeto que se va agregar a la colección.
 * @param {String} collectionName El nombre de la colección.
 * 
 * @returns {Promise}
 */
const insertOneDocument = (document, collectionName) => {
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err)
        console.log("Connected successfully to server")
      
        const db = client.db(dbName)
      
        const collection = db.collection(collectionName)

        collection.insertOne(document, function(err, result) {
            assert.strictEqual(err, null)
            assert.strictEqual(1, result.result.n)
            assert.strictEqual(1, result.ops.length)
            console.log("Inserted new document ")
        })

        client.close()
    })
}

/**
 * 
 * @param {String} collectionName El nombre de la colección de la cual quieres obtener el ultimo valor.
 * 
 * @returns {Promise}
 */
const getLastDocument = (collectionName) => new Promise((resolve) => {
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err)
        console.log("Connected successfully to server")
      
        const db = client.db(dbName)
      
        const collection = db.collection(collectionName)

        let value = collection.findOne({}, { limit: 1, sort: {$natural:-1} })
        client.close()

        return resolve(value)
    })
})

/**
 * 
 * @param {String} collectionName El nombre de la colección de la cual quieres obtener el documento.
 * @param {Object} query La consulta que quieres obtener.
 * @param {Object} opts Las opciones que puedes mandar.
 * 
 * @returns {Promise}
 */
const getOneDocument = (collectionName, query, opts) => new Promise((resolve) => {
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err)
        console.log("Connected successfully to server")
      
        const db = client.db(dbName)
      
        const collection = db.collection(collectionName)

        let document = collection.findOne(query, opts)
        client.close()

        return resolve(document)
    })
})

/**
 * 
 * @param {String} collectionName El nombre de la colección de la cual quieres obtener los documentos.
 * @param {Object} query La consulta que quieres obtener.
 * @param {Object} opts Las opciones que puedes mandar.
 */
const getDocuments = (collectionName, query = {}, opts = {}) => new Promise((resolve) => {
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err)
        console.log("Connected successfully to server")
      
        const db = client.db(dbName)
      
        const collection = db.collection(collectionName)

        let document = collection.find(query, opts).toArray()
        client.close()

        return resolve(document)
    })
})

module.exports = {
    insertOneDocument,
    getLastDocument,
    getOneDocument,
    getDocuments
}
