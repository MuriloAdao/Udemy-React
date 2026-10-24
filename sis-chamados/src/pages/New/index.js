import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlusCircle } from "react-icons/fi"
import './new.css'

import { useState } from "react"


export default function New(){
 const [costumers, setCostumers]= useState('')
 const [complemento, setComplemento] = useState('')
 const [assunto, setAssunto] = useState('Suporte')
 const [status, setStatus] = useState('Aberto')

 function handleOptionChange(e){
    setStatus(e.target.value);
 }

    return(
        <div>
<Header/>
<div className="content">
<Title name="Novo Chamado">
   <FiPlusCircle size={25}/>
</Title>

<div className="container">
    <form className="form-profile">
        <label>Clientes</label>
        <select>
            <option key={1} value={1}>Mercado Bohema</option>
            <option key={2} value={2}>SmartTechStore</option>


        </select>

         <label>Assuntos</label>
        <select>
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
        <textarea type="text" placeholder="Digite seu problema"/>

        <button type="submit" value={complemento} onChange={(e)=> setComplemento(e.target.value)}>Registrar</button>         
        
    </form>
</div>
</div>
        </div>
    )
}