import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';
import { toast } from 'react-toastify';



function Favoritos(){
const [filmes,setFilmes] = useState([])

useEffect(()=>{
    const minhaLista = localStorage.getItem('@primevideo');
    setFilmes(JSON.parse(minhaLista)|| [])
    
},[])
function excluirFilme(id){
  let filtroFilmes = filmes.filter((item)=>{
    return (item.id !== id)
  })

  setFilmes(filtroFilmes);
  localStorage.setItem("@primevideo", JSON.stringify(filtroFilmes))
toast.success("Filme removido com sucesso")
}

    return(
    <div className='container-favoritos'>
        <h1>Meus favoritos</h1>
{filmes.length === 0 && <span> Voce nao possui Filmes Salvo!</span>}

        <ul>
            {filmes.map((item)=>{
                return(
                    <li ke={item.id}>
                        <span>{item.title}</span>
                      <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title}/>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                            <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
            
        </div>
    )
}
export default Favoritos;