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
    const {start_year, end_year, gender, countries, colors} = query;
    OwnersModel.find({'gender': new RegExp(`${gender}`, 'i')})
    .where('car_model_year')
    .gte(start_year)
    .lte(end_year)
    .where('countries')
    .in(countries)                                                                                                                                                                                                                                                                                                                                                                                                                              
    .where('car_color')
    .in(colors)
    .exec((err, data)=>{
        if (err) console.log` ERROR FROM MODEL WHILE LOOKING FOR YOUR CARS LIST: ${err}`;
        res.send(data);
    } )
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