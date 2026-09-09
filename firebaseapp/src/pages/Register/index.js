import {useState} from 'react'
import { Link, replace } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConnection'

function Register(){
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const navigate = useNavigate();

async function handleRegister(e){
    e.preventDefault();

if(email !== '' && password !== ''){
   await createUserWithEmailAndPassword (auth, email, password)
   .then (()=>{
    navigate('/admin',{replace: true})
   })
   .catch(()=>{
    console.log("Erro ao fazer Login")
   })


}else{
    alert('Preencha todos os campos')
}

}

    return(
        <div className='home-container'>
            <h1>Crie sua Conta</h1>
            <span>Preencha os campos</span>
        
        <form className='form' onSubmit={handleRegister}>
            <input type='text'
             placeholder='Digite um Email'
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}/>
              <input 
              type='password'
              placeholder='Digite uma senha'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            <button type='submit'>Cadastrar</button>
            
        </form>

        <Link className="buttonLink" to ="/">
        Ja possui uma conta? Faça o login!!
        </Link>
        
        
        
        </div>
    )
}

export default Register;