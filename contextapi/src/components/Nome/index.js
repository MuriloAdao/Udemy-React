import React from "react"
import Aluno from "../Alunos";
import { UserContext } from "../../contexts/user";
import { useContext } from "react";

function Nome(){ 
    const {alunos, setAlunos} = useContext(UserContext);
return(

    <div>
        <span>Seja bem vindo:{alunos}</span>
        <br/>

        <button onClick={()=> setAlunos('Gabriel')}>Clique</button>
    </div>

    
);
}

export default Nome;