import express, { application } from "express"
import APIController from '../controller/APIController'

let router = express.Router()
const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers)//method Get ->Read Data
    router.post('/create-users', APIController.createNewUser);//method POST->create a newusers

    router.put('/update-users', APIController.UpdateUser)  //method put for update user
    router.delete('/delete-user/:id', APIController.DeleteUser)//method delete for Delete data
    return app.use('/api/v1/', router)

}

export default initAPIRoute