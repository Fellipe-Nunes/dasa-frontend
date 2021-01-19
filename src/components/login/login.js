import React, { useState } from 'react'
import { saveToken } from '../../config/auth'
import './login.css'
import { useHistory } from 'react-router-dom'
import { authentication } from '../../services/auth'
import { clientHttp } from '../../config/config'
import Alert from '../alert'


const Login = (props) => {
    const [auth, setAuth] = useState({})
    const [error, setError] = useState("")
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setAuth({
            ...auth,
            [event.target.name]: event.target.value
        })
        return;
    }

    const formIsValid = () => {
        return auth.email && auth.password
    }

    const submitForm = async () => {
        if (formIsValid()) {
            setLoading(true)
            try {
                const { data: { token } } = await authentication(auth)
                clientHttp.defaults.headers['x-auth-token'] = token
                saveToken(token)
                history.push('/')
            } catch (error) {
                setLoading(false)
                const erroCurrent = error.response.data.errors
                if (erroCurrent) {
                    const allItems = erroCurrent.map(item => item.msg)
                    const allItemsToString = allItems.join('-')
                    setError(allItemsToString)
                }
            }

        }
        return
    }

    const pressEnter = (event) => event.key === 'Enter' ? submitForm() : null

    return (
        <section className="section-login">
            <div className="title">
                <h1>Acesso ao sistema</h1>
            </div>
            <div className="login">
                <div className="form-login">
                    <div className="row">
                        <div className="etiqueta">
                            <label htmlFor="email">Identificação</label>
                        </div>
                        <div className="form-input">
                            <input disabled={loading} className="campo" type="email" name="email" onChange={handleChange} value={auth.email || ""} placeholder="Por favor, digite seu e-mail" onKeyPress={pressEnter} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="etiqueta">
                            <label htmlFor="password">Senha</label>
                        </div>
                        <div className="form-input">
                            <input disabled={loading} className="campo" type="password" name="password" onChange={handleChange} value={auth.password || ""} placeholder="Por favor, digite sua senha" onKeyPress={pressEnter} />
                        </div>
                    </div>
                    <div className="row">
                        <button disabled={!formIsValid()} className="btn cadastrar" onClick={submitForm}> {loading ? (<i className="fa fa-spinner fa-spin"></i>) : "Entrar"}</button>
                        <div className="alertLogin">
                            <Alert show={error ? true : false} type="error" message={error} />                            
                          
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;