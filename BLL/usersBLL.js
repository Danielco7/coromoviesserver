const User = require('../models/usersmodels');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
            if (err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) {
                reject(err)
            } else {
                resolve(user)
            }
        })
    })
}

const addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const user = new User(newUser);

        user.save((err) => {
            if (err) {
                reject(err)
            } else {
                User.find([],(err,users)=>{
                    if(err){
                        reject(err)
                    }else{

                        resolve(users);
                    }
                })
            }
        })
    })
}

const updateUser = (id, userToUpdate) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, userToUpdate, (err) => {
            if (err) {
                reject(err)
            } else User.find([],(err,users)=>{
                if(err){
                    reject(err)
                }else{
                    User.find([],(err,users)=>{
                        if(err){
                            reject(err)
                        }else{
    
                            resolve(users);
                        }
                    })
                }
            })
        })
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}




module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}
