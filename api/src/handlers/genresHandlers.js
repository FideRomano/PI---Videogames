const { getAllGenres } = require('../controllers/genreControl')

const getGenresHandler = async (req, res) => {
    const result = await getAllGenres();
    return res.status(200).send(result)
};

module.exports = {getGenresHandler};