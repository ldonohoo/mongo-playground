const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5001;

// Enable CORS
app.use(cors());

// MongoDB Connection URI
const uri = `mongodb+srv://lisa:a0Uk701NFus3swqP@myatlasclusteredu.nj66p.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB and run aggregation
async function getTopRatedMovies(req, res) {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // high rated movies, decending rating order, top 10, title and rating
    // const pipeline = [
    //   { $match: { 'imdb.rating': { $gte: 8 } } },  
    //   { $sort: { 'imdb.rating': -1 } },            
    //   { $limit: 10 },                              
    //   { $project: { title: 1, 'imdb.rating': 1 } } 
    // ];

    //
    const pipeline = [
        { $match: { 'imdb.rating': { $lt: 2 } } },  
        { $sort: { 'imdb.rating': 1 } },           
        { $limit: 50 },                             
        { $project: { 'imdb.rating': 1,
                       title: 1,} } 
      ];

    const topRatedMovies = await movies.aggregate(pipeline).toArray();
    res.json(topRatedMovies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  } finally {
    await client.close();
  }
}

// API endpoint for top-rated movies
app.get('/api/movies', getTopRatedMovies);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
