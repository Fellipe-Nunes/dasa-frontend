import { clientHttp } from '../config/config.js'

const CreateEmployee = (data) => clientHttp.post(`/admin`, data)

const ListEmployee = () => clientHttp.get(`/admin`)

const DeleteEmployee = (email) => clientHttp.delete(`/admin/${email}`)

const UpdateEmployee = (data) => clientHttp.patch(`/admin/${data.email}`, data)

const ShowEmployee = (email) => clientHttp.get(`/admin/${email}`)




export {
    CreateEmployee,
    ListEmployee,
    DeleteEmployee,
    UpdateEmployee,
    ShowEmployee 
}
