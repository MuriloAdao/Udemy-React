import {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme() {
const {id}= useParams();
const navigate = useNavigate();
const[filme, setFilme] = useState({});
const [loading, setLoading] = useState(true);

useEffect(()=>{
    async function loadFilme(){
        await api.get(`/movie/${id}`, {
            params:{
                api_key:"fd73c160fe61f4ec5c07aff3203f7e8e",
                language:"pt-BR",
            }
        })
        .then((response)=>{
        setFilme(response.data);
        setLoading(false);
        })
        .catch(()=>{
            console.log("Filme nao encontrado");
            navigate("/", {replace: true});
            return;
        })
    }
    loadFilme();
},[navigate, id])

function salvarFilme(){
    const minhaLista = localStorage.getItem("@primevideo");

    let filmeSalvos = JSON.parse(minhaLista) || [];
    
    const hasFilme = filmeSalvos.some((filmesSalvo)=>filmesSalvo.id===filme.id)
    if(hasFilme){
       toast.warn("Esse filme ja esta salvo")
        return;
    }

    filmeSalvos.push(filme);
    localStorage.setItem("@primevideo", JSON.stringify(filmeSalvos));
    toast.success("Filmo salvo com sucesso")
}

//if(loading){
    //return(
        //<div className="filme-info">
            //<h1>Carregando Detalhes...</h1>
       // </div>
    //)
//}

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliacao: {filme.vote_average} /10</strong>
       
       
       <div className="area-button">
        <button onClick={salvarFilme}>Salvar</button>
        <button> <a target= "blank" rel = "external "href={`https://youtube.com//results?search_query=${filme.title} Trailer`}> Trailer </a> </button>
       </div>
       
        </div>
    )
    
}

export default Filme;