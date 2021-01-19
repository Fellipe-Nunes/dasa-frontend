import React, { useState, useEffect } from 'react'
import { CreateUser, ShowUser, UpdateUser } from '../../services/user'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '../alert/index'
import './user.css'

const UserCreate = (props) => {
    const [isEdit, setisEdit] = useState(false)
    const { email } = useParams()
    const history = useHistory()
    const [alert, setAlert] = useState({})
    const method = isEdit ? UpdateUser : CreateUser
    const [isSubmit, setIsSubmit] = useState (false)

    const [form, setForm] = useState({
        is_active: true,
        is_admin: false

    })

    useEffect(() => {
        const getShowUser = async () => {
            const user = await ShowUser(email)
            setForm(user.data)
        }
        if (email) {
            setisEdit(true)
            getShowUser()            
        }
    }, [email]

    )

    const handleChange = (event) => {
       
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const formIsValid = () => {
        let radioButtonIsValid = false
         let radiosButtons = document.getElementsByName('sexo')
 
         radiosButtons.forEach((radioButton) => {
             if (radioButton.checked) {
                 radioButtonIsValid = true
             }
        })
        return (
            radioButtonIsValid &&            
            form.nascimento &&
            form.nome &&
            form.sobrenome &&
            form.rg &&
            form.email &&
            form.telefone
        )
    }

    const checkMasculino = () => {
        if(form.sexo === "Masculino"){
            document.getElementById("masculino").checked = true
        }      
    }

    const checkFeminino = () => {
        if(form.sexo === "Feminino"){
            document.getElementById("feminino").checked = true
        }
    }
   

    const submitForm = async (event) => {
        try {
            setIsSubmit(true)
            await method(form)
            
            setForm({
                is_active: true,
                is_admin: false
            })

            setAlert({
                type: "success",
                message: "Formulário enviado com sucesso!",
                show: true
            })

            setTimeout(() => 
                history.push('/pacientes')
            , 3000);

            
        } catch (error) {
            setAlert({
                type: "error",
                message: "Ocorreu um erro no cadastro...",
                show: true
            })
            setIsSubmit(false)

        }
    }

    
    return (
        <section>
            <div className="title">
                <h1>{isEdit ? 'Editar paciente' : 'Cadastro de pacientes'}</h1>
            </div>
            
            <div className="cadastroPaciente">
            <Alert type={alert.type || ""} message={alert.message || ""} show={alert.show || false} />                
                <div className="row">
                    <div className="radios">
                        <div className="etiqueta">Sexo</div>
                        <div className="radio">
                            <input disabled={isSubmit} className="option" type="radio" id="masculino" name="sexo" onChange={handleChange} value="Masculino" checked={isEdit ? checkMasculino() : form.masculino}/>
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div className="radio">
                            <input disabled={isSubmit} className="option" type="radio" id="feminino" name="sexo" onChange={handleChange} value="Feminino" checked={isEdit ? checkFeminino() : form.feminino}/>
                            <label htmlFor="feminino">Feminino</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nascimento">Nascimento:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="date" name="nascimento" onChange={handleChange} value={form.nascimento || ""} placeholder="Nascimento" />
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nome">Nome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="nome" label="Nome:" onChange={handleChange} value={form.nome || ""} placeholder="Insira o nome do paciente" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="sobrenome">Sobrenome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="sobrenome" onChange={handleChange} value={form.sobrenome || ""} placeholder="Insira o sobrenome do paciente" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="rg">RG:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="number" min="0" name="rg" onChange={handleChange} value={form.rg || ""} placeholder="Insira o RG do paciente" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="email" name="email" onChange={handleChange} value={form.email || ""} placeholder="Insira o e-mail do paciente" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="telefone">Telefone:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="tel" name="telefone" onChange={handleChange} value={form.telefone || ""} placeholder="Insira o telefone do paciente" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <button disabled={!formIsValid()} className="btn cadastrar" onClick={submitForm}>{isEdit ? 'EDITAR' : 'CADASTRAR'}</button>
                </div>
                <div className="row">
                    <button className="btn cadastrar" onClick={() => history.goBack()}>CANCELAR</button>
                </div>
            </div>
        </section>
    )
}
export default UserCreate
