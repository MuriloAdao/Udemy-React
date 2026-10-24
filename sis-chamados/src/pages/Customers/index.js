import '../Profile/profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { useState } from 'react'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Customers(){

const [nome, setNome] = useState('');
const [cnpj, setCnpj] = useState('');
const [endereco, setEndereco] = useState('');

async function handleRegister(e){
    e.preventDefault();
   

    if(nome !=='' && cnpj !== '' && endereco !== ''){
        await addDoc(collection(db, "customers"), {
            nomeEmpresa: nome, cnpj:cnpj, endereco:endereco
        })
        .then(()=>{
        setNome('')
        setCnpj('')
        setEndereco('')
        toast.success("Empresa Registrada")
    })
    .catch((error)=>{
        console.log(error);
        toast.error("Error ao Registrar")
    })
    }else{toast.error("Preencha todos os Campos")}
}


    return(
        <div>
            <Header/>
            <div className='content'>
<Title name="Clientes">
    <FiUser size={25}/>
</Title>

<div className='container'>
    <form className='form-profile' onSubmit={handleRegister}>
        <label>Nome do Cliente</label>
        <input type='text' placeholder='Nome' value={nome} onChange={(e)=>setNome(e.target.value)}/>

         <label>CNPJ</label>
        <input type='text' placeholder='00.000.000/0000-00' value={cnpj} onChange={(e)=>setCnpj(e.target.value)}/>

         <label>Endereço</label>
        <input type='text' placeholder='Local' value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>


        <button type='submit'>Salvar</button>   

  </form>
</div>

   

            </div>
        </div>
    )
}