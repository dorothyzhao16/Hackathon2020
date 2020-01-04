const SequelizeModels = require('./models');

function getUserPoints(id) {
    return new Promise(function(resolve, reject) {
        SequelizeModels.points.findOne({
            where: {
                id: id
            }
        })
        .catch(console.error)
        .then(response => {
            if (response == null) {
                addUserPoints(id, 0)
                .catch(console.error)
                .then(_ => {
                    resolve(0);
                })
            }
            else {
                resolve(response.points);
            }
        })
    })
}

function setUserPoints(id, pointDiff) {
    return new Promise(function(resolve, reject) {
        getUserPoints(id)
        .then(userPoints => {
            if (userPoints == null) {
                addUserPoints(id,points)
                .then(_ => {
                    addUserPoints(id, pointDiff)
                .catch(console.error)
                })
                .then(_ => {
                    resolve(true);
                
                })
            }
            else {
                SequelizeModels.points.update({
                    points: userPoints + pointDiff
                }, {
                    where: {
                        id: id
                    }
                })
                .catch(console.error)
                .then(_ => {
                    resolve(true);
                })
            }
        })
        .catch(console.error);
    })
}


function addUserPoints(id, points) {
    return new Promise(function(resolve, reject) {
        SequelizeModels.points.create({
            id: id,
            points: points
        })
        .catch(console.error)
        .then(response => {
            resolve(true);
        })
    })
}

module.exports = {
    getUserPoints: getUserPoints,
    setUserPoints: setUserPoints,
    addUserPoints: addUserPoints
};