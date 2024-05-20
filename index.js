const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}cluster0.evugk9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const addTuristCollection = client.db("turistDB").collection("addTurist");

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        // to get data localhost://500
        app.get('/addTurist', async (req, res) => {
            const result = await addTuristCollection.find().toArray();
            res.send(result);
        })
        app.get('/addTurist/:id', async(req,res)=>{
            const id=req.body.id;
            const query = { _id: new ObjectId (id) };
            const result = await addTuristCollection.findOne(query);
            res.send(result)
        })

        app.post('/addTurist', async (req, res) => {
            const addTurist = req.body;
            // console.log(addTurist)
            const result = await addTuristCollection.insertOne(addTurist);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('TuristZoon.. Root server sight...')
});

app.listen(port, () => {
    console.log(`TuristZoon on port ${port}`)
})