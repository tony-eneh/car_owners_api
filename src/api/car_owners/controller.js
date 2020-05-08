import * as model from './model';


console.log('entered /api/car_owners/controller.js');

export const getOwner = (req, res) => {

    //create query object
    let query = { id: req.params.id };

    model.getOwner(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL ${err}`;
        res.send(data);
    });
};

export const getOwners = (req, res) => {

    //create query object
    //from the json payload, or url query parameters or just use an empty object
    let query = req.body ? req.body : req.query || {};
    model.getOwners(query, (err, data) => {
        if (err) console.log ` ERROR FROM MODEL ${err}`;
        console.log('data fetched from db'+data);
        res.send(data);
    });
};