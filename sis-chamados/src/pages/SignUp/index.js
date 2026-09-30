//CADASTRAR

import { useContext, useState } from "react"
import './signup.css'
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"


export default function SignUp(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome]= useState('')

const {signUp, loadingAuth} = useContext(AuthContext);

async function handleSubmit(e){
    e.preventDefault();

    if(nome !== '' && email !== '' && password !== ''){
 await signUp(email, password, nome);
    }
}


    return(
         <div className='container-center'>
            <div className='cadastro'>
                <div className='cadastro-area'>
<img src={logo} alt="Logo do Sistema"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <input type='text' placeholder='email@email.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='password' placeholder='******' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'> {loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>
                <Link to='/'>Ja tenho uma conta</Link>

            </div>
   </div>
    )
}