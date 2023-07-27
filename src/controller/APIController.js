import pool from '../configs/connectDB';


let getAllUsers = async (req, res) => {
    const [row, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json(
        {
            message: "oke-getuser",
           
            data: row
        }
    )
}
// tao 1 user moi
let createNewUser = async (req, res) => {
    let { fullname, age, gender } = req.body
    if (!fullname || !age || !gender) {
        return res.status(200).json(
            {
                message: " missing require 2 "
            })
    }
    console.log('insert into users(fullname,age,gender) values(?,?,?)', [fullname, age, gender])
    await pool.execute('insert into users(fullname,age,gender) values(?,?,?)', [fullname, age, gender])


    return res.status(200).json({
        message: 'nhan day du data'
    })
}
let UpdateUser = async (req, res) => {
    let { fullname, age, gender,id } = req.body
    if (!fullname || !age || !gender|| !id) {
        return res.status(200).json(
            {
                message: " missing Data Required _ in UpdateAPI Service"
            })
    }
    await pool.execute('update users set fullname = ? ,age=?,gender=? where id=?', [fullname, age, gender, id]);
    return res.status(200).json(
        {
            message: ' Thuc hien Update'
        }
    )
}
let DeleteUser = async (req, res) => {
    let userId = req.params.id
    if (!userId) {
        return res.status(200).json(
            {
                message: " missing data Required"
            }
        )
    }
    await pool.execute('Delete from users where id = ?', userId)
    return res.status(200).json(
        {
            message: " Data Accept"
        }
    )
}
module.exports = {
    getAllUsers, createNewUser, UpdateUser, DeleteUser
}