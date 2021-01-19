import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import { List as userList, Create as userCreate } from '../components/user'
import { List as employeeList, Create as employeeCreate } from '../components/admin'
import Home from '../components/home'
import jwt from 'jsonwebtoken' 
import { Route } from 'react-router-dom'
import { getToken } from '../config/auth' 


const User = (props) => {
    const [useinfo, setuseinfo] = useState({})
  
    useEffect(() => {
       (async() => {
            const { user } = await jwt.decode(getToken())
            setuseinfo(user)            
            
        })()
    }, [])

    return (
        <Layout info={useinfo}>           
            <Route exact match path={props.match.path} component={Home} />
            <Route exact path={props.match.path + "pacientes"} component={userList} />
            <Route exact path={props.match.path + "cadastrar-paciente"} component={userCreate} />
            <Route exact path={props.match.path + "editar-paciente/:email"} component={userCreate} />
            <Route exact path={props.match.path + "funcionarios"} component={employeeList} />
            <Route exact path={props.match.path + "cadastrar-funcionario"} component={employeeCreate} />
            <Route exact path={props.match.path + "editar-funcionario/:email"} component={employeeCreate} />         
        </Layout>
    )
    
}

export default User