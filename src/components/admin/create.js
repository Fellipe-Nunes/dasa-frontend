import React, { useState, useEffect } from 'react'
import { CreateEmployee, UpdateEmployee, ShowEmployee } from '../../services/admin'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '../alert/index'
import './admin.css'

const EmployeeCreate = (props) => {    
    const [isEdit, setisEdit] = useState(false)
    const { email } = useParams()
    const history = useHistory()
    const [alert, setAlert] = useState({})
    const method = isEdit ? UpdateEmployee : CreateEmployee
    const [isSubmit, setIsSubmit] = useState (false)
    const [form, setForm] = useState({ })

    
    useEffect(() => {
        const getShowEmployee = async () => {
            const user = await ShowEmployee(email)
            if (user.data.senha) {
                delete user.data.senha
            }
            setForm(user.data)
        }
        if (email) {
            setisEdit(true)
            getShowEmployee()            
        }
    }, [email]

    )

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        const name = event.target.name
       
        setForm({
            ...form,
            [name]: value
            
        })
        return
    }

    const formIsValid = () => {
        
        return (
                       
            form.nome &&
            form.sobrenome &&           
            form.email &&
            form.password
            
        )
    }

        
    const submitForm = async (event) => {
        try {
            setIsSubmit(true)
            await method(form)
            
            
            setAlert({
                type: "success",
                message: "Formulário enviado com sucesso!",
                show: true
            })

            setTimeout(() => 
                history.push('/funcionarios')
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
        <section className="sectionCreate">
            <div className="title">
                <h1>{isEdit ? 'Editar funcionário' : 'Cadastro de funcionários'}</h1>
            </div>
            <Alert type={alert.type || ""} message={alert.message || ""} show={alert.show || false} />
            <div className="cadastroFuncionario">                
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nome">Nome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="nome" label="Nome:" onChange={handleChange} value={form.nome || ""} placeholder="Insira o nome do funcionário" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="sobrenome">Sobrenome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="sobrenome" onChange={handleChange} value={form.sobrenome || ""} placeholder="Insira o sobrenome do funcionário" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="email" name="email" onChange={handleChange} value={form.email || ""} placeholder="Insira o e-mail do funcionário" autoComplete="false"/>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">Senha</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="password" name="password" onChange={handleChange} value={form.password || ""} placeholder="Insira uma senha" autoComplete="false"/>
                    </div>
                    
                </div>
               
                            <div className="row">
                                <div className="etiqueta">
                                <label htmlFor="is_admin">Administrador:</label>
                                <input type="checkbox" className="checkbox" name="is_admin" id="is_admin" onChange={handleChange} checked={form.is_admin} />
                                <label htmlFor="is_active">Ativo:</label>
                                <input type="checkbox" className="checkbox" name="is_active" id="is_active" onChange={handleChange} checked={form.is_active} />
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
export default EmployeeCreate
