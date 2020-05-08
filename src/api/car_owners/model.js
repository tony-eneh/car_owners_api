import mongoose from 'mongoose';
import { MONGODB_URI, DB_CAROWNERS_COLLECTION } from '../../config';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', (err)=>{
    console.log`database connection error ${err}`;
})

const schema = mongoose.Schema({
    id: {type: Number, required: true},
    first_name: String,
    last_name: String,
    email: String,
    country: String,
    car_model: String,
    car_model_year: Number,
    car_color: String,
    gender: {type: String, enum: ['Male', 'Female']},
    job_title: String,
    bio: String

});

const newSchema = new mongoose.Schema(schema);

newSchema.set('collection', DB_CAROWNERS_COLLECTION);

export const OwnersModel = mongoose.model('CarOwners', newSchema);