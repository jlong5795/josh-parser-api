const knex = require('knex');
const db = require('./database/dbconfig');

const add = async (juice) => {
    return db('juices').insert(juice);
};

const getAll = () => {
    return db('juices');
};

const getAllBrands = () => {
    return db('juices').distinct().pluck('brand')
}

const getAllFlavors = () => {
    return db('juices').distinct().pluck('flavor')
}

const getAllSizes = () => {
    return db('juices').distinct().pluck('size')
}

const getSpecific = (brand, flavor, size) => {
    return db('juices').where('brand', brand).where('flavor', flavor).where('size', size)
}

const removeAll = async () => {
    await db('cleaned').del();
    return db('juices').del();
};

const addCleaned = (juice) => {
    return db('cleaned').insert(juice);
}

const getCleaned = () => {
    return db('cleaned').select('brand', 'flavor', 'size', 'nicotine');
}

const addBatch = (batch) => {
    return knex.batchInsert('juices', batch, 30)
    .then(response => { return {status: 201, message: 'Batch insert ok'}})
    .catch(error => { return { status: 500, message: 'insert failed', error}})
}
module.exports = {
    add,
    addBatch,
    getAll,
    getAllBrands,
    getAllFlavors,
    getAllSizes,
    getSpecific,
    removeAll,
    addCleaned,
    getCleaned
}