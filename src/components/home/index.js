import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom' 
import './home.css'
import jwt from 'jsonwebtoken'
import { getToken } from '../../config/auth'



const Home = (props) => {
  const [userIsAdmin, setUserIsAdmin] = useState({})

  const history = useHistory()

  useEffect(() => {
    (async () => {
        const { user } = await jwt.decode(getToken())
        setUserIsAdmin(user.is_admin)
    })()
    return () => { }
}, [])


  return (
    <section className="home">
      <div className="title">
        <h1>Menú principal</h1>
      </div>
      <div className="nav">
        <button className="homeBtn" onClick={() =>history.push('/pacientes')}><i className="fa fa-users i"></i>PACIENTES</button>
        <button className="homeBtn" onClick={() => history.push('/cadastrar-paciente')}><i className="fa fa-user-plus i"></i>NOVO PACIENTE</button>
        {userIsAdmin ? (
          <button className="homeBtn" onClick={() => history.push('/funcionarios')}><i className="fa fa-user-md i"></i>FUNCIONÁRIOS</button>     

        ): "" }                
           
      </div>
    </section>
  )

}

export default Home