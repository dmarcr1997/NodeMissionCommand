const { getAllLaunches, createNewLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpCreateNewLaunch(req, res) {
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);
    const validateOrError = validateLaunch(launch);
    if(!validateOrError.valid){
        return res.status(400).json(validateOrError)
    };
    createNewLaunch(launch);
    return res.status(200).json(launch);
}

function validateLaunch(launch) {
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return {
            valid: false,
            error: 'Missing Required Launch Property'
        }
    }
    else if(isNaN(launch.launchDate)){
        return {
            valid: false,
            error: 'Invalid Launch Date'
        };
    }
    else return {
        valid: true
    };
}

module.exports = {
    httpGetAllLaunches,
    httpCreateNewLaunch
};