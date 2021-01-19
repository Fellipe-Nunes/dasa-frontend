import React from 'react'
import { useHistory } from 'react-router-dom'
import { removeToken, isAuthenticated } from '../../../config/auth'
import './header.css'
import logo from '../../../assets/img/asgard-health4.png'

const Header = (props) => {

    const history = useHistory()

    const logout = () => {
        removeToken()
        history.push('/login')
    }

    const hasUser = () => {
        if (props.info && props.info.nome) {
            return (
                <>
                <i className="fa fa-user"/> {props.info.nome} |
                </>
            )
        }
    }
    
    return (

    <header>
        <div className="user">
            {hasUser()}
            {isAuthenticated() ? (
                <button className="logout" onClick={logout}>Sair <i className="fa fa-sign-out"></i></button>
            ) : ""}
            

        </div>
        <div className="logo">
            <img src={logo} alt="Asgard Health"/>
        </div>
        
        
    </header>       
    
    )
}
    
export default Header
