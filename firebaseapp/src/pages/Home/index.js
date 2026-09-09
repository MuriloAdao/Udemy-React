import {useState} from 'react'
import './index.css'
import { Link, replace } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Home(){
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const navigate=useNavigate();

async function handleLogin(e){
    e.preventDefault();

if(email !== '' && password !== ''){
  await signInWithEmailAndPassword(auth, email, password)
  .then(()=>{
navigate('/admin', {replace:true})
  })
  .catch(()=>{
    console.log("Erro ao fazer o Login")
  })
}else{
    alert('Preencha todos os campos')
}

}

    return(
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua Agenda de forma Facil!</span>
        
        <form className='form' onSubmit={handleLogin}>
            <input type='text'
             placeholder='Digite seu email...'
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}/>
              <input 
              type='password'
              placeholder='Digite sua senha...'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            <button type='submit'>Acessar</button>
            
        </form>

        <Link className="buttonLink" to ="/register">
        Nao possui uma conta?Cadastre-se!!
        </Link>
        
        
        
        </div>
    )
}

export default Home;