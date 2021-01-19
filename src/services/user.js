import { clientHttp } from '../config/config.js'

const CreateUser = (data) => clientHttp.post(`/user`, data)

const ListUser = () => clientHttp.get(`/user`)

const DeleteUser = (email) => clientHttp.delete(`/user/${email}`)

const UpdateUser = (data) => clientHttp.patch(`/user/${data.email}`, data)

const ShowUser = (email) => clientHttp.get(`/user/${email}`) 


export {
    CreateUser,
    ListUser,
    DeleteUser,
    UpdateUser,
    ShowUser
}
