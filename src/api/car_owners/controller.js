import { OwnersModel } from './model';


console.log('entered /api/car_owners/controller.js');

export const getOwner = (req, res) => {

    //create query object
    let query = { id: req.params.id };

    OwnersModel.findOne(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL ${err}`;
        res.send(data);
    });
};

export const getOwners = (req, res) => {

    //create query object
    //from the json payload, or url query parameters or just use an empty object
    let query = req.body ? req.body : req.query || {};
    console.log`query passed to db ${query}`;
    
    OwnersModel.find(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL ${err}`;
        console.log('data fetched from db'+data);
        res.send(data);
    });
};

export const createOwner = (req, res) => {

    //create query object
    let query = req.body ? req.body : req.query || {};

    OwnersModel.createOwner(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL CREATING: ${err}`;
        res.send(data.insertedId);
    })
};

export const updateOwner = (req, res) => {

    //create query object
    let object = req.body ? req.body : req.query || {};
    let query = { id: req.params.id };
    // console.log `object in controller ${object}`;
    // console.log `req.body ${req.body}`;
    delete object.id;
    OwnersModel.updateOwner(query, object, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL UPDATING: ${err}`;
        res.send(data);
    })
};

export const deleteOwner = (req, res) => {

    //create query object
    let query = { id: req.params.id };

    OwnersModel.deleteOwner(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL DELETING: ${err}`;
        res.send(data);
    })
};