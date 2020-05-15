import { OwnersModel } from './model';


console.log('entered /api/car_owners/controller.js');

// db query builder
export const buildQuery = (queryStr)=>{
    // parse the string to object
    const urlQuery = JSON.parse(queryStr);
    
    let {start_year, end_year, gender, countries, colors} = urlQuery;
    
    let dbQuery = {};
    if (start_year && end_year){
        dbQuery['car_model_year'] = {$gte : start_year, $lte : end_year}
    }
    if (gender){
        // Capitalize first letter of gender string. That is the format it is stored in our db
        gender = gender.replace(gender[0], gender[0].toUpperCase());
        dbQuery['gender'] = gender;
    }
    if (countries.length){
        dbQuery['country'] = {$in : countries}
    }
    if (colors.length){
        dbQuery['car_color'] = {$in : colors}
    }

    return dbQuery;

};

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
    //from the 'filter' url query parameter or just use an empty object
    let filterString = req.query.filter || {};
    console.log`query passed to db ${filterString}`;
    
    // Build query
    const dbQuery = buildQuery(filterString);

    console.log('dbQuery',dbQuery);

    OwnersModel.find(dbQuery)
    .exec((err, data)=>{
        if(err) return console.error('ERR', err)
        console.log('fetched data from db')
        res.json(data);
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