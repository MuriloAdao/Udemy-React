import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlusCircle } from "react-icons/fi"
import './new.css'

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"
import {collection, getDocs, getDoc, doc, addDoc} from 'firebase/firestore'
import { toast } from "react-toastify"
const listRef = collection(db, "customers");

export default function New(){
    const {user} = useContext(AuthContext);
 const [customers, setCustomers]= useState('')
 const [complemento, setComplemento] = useState('')
 const [assunto, setAssunto] = useState('Suporte')
 const [status, setStatus] = useState('Aberto')
 const [loadCustomer, setLoadCustomer] = useState(true);
const [customersSelected, setCustomersSelected]= useState(0);
useEffect(()=>{
async function loadCustomer(){
    const querySnapshot = await getDocs(listRef)
    .then((snapshot)=>{
        let lista=[];
        snapshot.forEach((doc)=>{
            lista.push({
                id:doc.id,
                nomeEmpresa: doc.data().nomeEmpresa
            })
        })

        if(snapshot.docs.size === 0){
            console.log("Nenhuma empresa encontrada");
            setCustomers([{id: '1', nomeEmpresa:'Frela'}]);
            setLoadCustomer(false);
            return;
        }

        setCustomers(lista);
        setLoadCustomer(false);
    })
    .catch((error) =>{
        console.log("Erro ao buscar os Clientes")
        setLoadCustomer(false);
        setCustomers([{id: '1', nomeEmpresa: 'Frela'}])
    })
}
loadCustomer();
},[])

 function handleOptionChange(e){
    setStatus(e.target.value);
 }

 function handleChangeSelect(e){
    setAssunto(e.target.value);
 }
 function handleChangeCustomer(e){
    setCustomersSelected(e.target.value);
 }
async function handleRegister(e){
    e.preventDefault();

    await addDoc(collection(db, "chamados"),{
        created:new Date(),
        cliente:customers[customersSelected].nomeEmpresa,
        clienteId: customers[customersSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
    })
    .then(() => {
        toast.success("Chamado registrado!")
        setComplemento('')
        setCustomersSelected(0)
    })
    .catch((error)=>{
        toast.error("Ops erro ao registrar!")
        console.log(error);
    })
}
    return(
        <div>
<Header/>
<div className="content">
<Title name="Novo Chamado">
   <FiPlusCircle size={25}/>
</Title>

<div className="container">
    <form className="form-profile" onSubmit={handleRegister}>
        <label>Clientes</label>
        {
            loadCustomer ? (
                <input type='text' disabled={true} value="Carregando..."/>  
            ) : (
                <select value={customersSelected} onChange={handleChangeCustomer}>
                    {customers.map((item, index)=>{
                        return(
                            <option key={index} value={index}>
                                {item.nomeEmpresa}
                            </option>
                        )
                    })}
                </select> 
            )
            
        }


         <label>Assuntos</label>
        <select value={assunto} onChange={handleChangeSelect} >
            <option value="Suporte">Suporte</option>
            <option  value="Visita Tecnica">Visita Tecnica</option>
            <option value="Financeiro">Financeiro</option>
            

        </select>

        <label>Status</label>
        <div className="status">
        <input type="radio" nome="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'}/>
        <span>Em aberto</span>
        <input type="radio" nome="radio" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'}/>
        <span>Progresso</span>
         <input type="radio" nome="radio" value="Concluido" onChange={handleOptionChange} checked={status === 'Concluido'}/>
        <span>Concluido</span>
        </div>

        <label>Complementos</label>
        <textarea type="text" placeholder="Digite seu problema" value={complemento} onChange={(e)=> setComplemento(e.target.value)}/>

        <button type="submit">Registrar</button>         
        
    </form>
</div>
</div>
        </div>
    )
}