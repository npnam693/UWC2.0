import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express();
import route from './routes/index.js'


route(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_URL = "mongodb+srv://uwc20_cse2022:uwc20_cse2022@cluster0.ab6rdpr.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)})
    })
    .catch((error) => console.log(`Server can't listening`));