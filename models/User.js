const knex = require('../libraries/Postgres');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const crypto = require('crypto');

async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

const registerUserInDb = async (email,username,password) => {
    const hpass = await hash(password);
    return await knex('users').insert({
        userid: crypto.randomUUID(),
        username,
        email,
        password: hpass,
        counter: 0
        });
}
 
const verifyUserInDb = async(email,password) => {
    let c=0;
    let tS =0;
    const currDate = Date.now();

    await knex('users').select("*").where({email})
    .then((data)=> {
        c = data[0]?.counter||0;
        tS = data[0]?.timestamp1||0;
    }) 

    if(tS!= null && currDate-tS>=60*1000){
        await knex.raw(`update users set counter=? where email=?`,[0, email])
            .catch(err => err);
    }

    if(c<3){
        if(c===0){
            console.log(c)
            knex.raw("update users set timestamp1=? where email=?",[currDate, email])
        }   

        await knex.raw("update users set counter = counter+1 where email=?",[email])
                .catch(err => err);

        return await knex('users').select('*').where('email', email)
                    .then(async (data) => {
                        if(verify(password, data[0].password.toString()))
                            return data;
                    })
                    .catch((err) => console.log(err));
        }   

        return {"message": 'Limit set'};
    }


module.exports = {
    registerUserInDb, verifyUserInDb
}; 