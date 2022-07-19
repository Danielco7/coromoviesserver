const Subs = require('../models/subsmodels');

const getAllSubs = () => {
    return new Promise((resolve, reject) => {
        Subs.find({}, (err, subs) => {
            if (err) {
                reject(err)
            } else {
                resolve(subs)
            }
        })
    })
}

const getSubById = (id) => {
    return new Promise((resolve, reject) => {
        Subs.findById(id, (err, sub) => {
            if (err) {
                reject(err)
            } else {
                resolve(sub)
            }
        })
    })
}

const addSub = (newSub) => {
    return new Promise((resolve, reject) => {
        const sub = new Subs(newSub);

        sub.save((err) => {
            if (err) {
                reject(err)
            } else {
                Subs.find([],(err,subs)=>{
                    if(err){
                        reject(err)
                    }else{

                        resolve(subs);
                    }
                })
            }
        })
    })
}

const updateSub = (id, SubToUpdate) => {
    return new Promise((resolve, reject) => {
        Subs.findByIdAndUpdate(id, SubToUpdate, (err) => {
            if (err) {
                reject(err)
            } else Subs.find([],(err,subs)=>{
                if(err){
                    reject(err)
                }else{
                    Subs.find([],(err,subs)=>{
                        if(err){
                            reject(err)
                        }else{
    
                            resolve(subs);
                        }
                    })
                }
            })
        })
    })
}

const deleteSub = (id) => {
    return new Promise((resolve, reject) => {
        Subs.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}




module.exports = {
    getAllSubs,
    getSubById,
    addSub,
    updateSub,
    deleteSub
}