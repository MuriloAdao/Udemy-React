import {Link} from 'react-router-dom';
import './erro.css';
function Erro(){
    return(
        <div className="not-found">
            <h1>Pagina Nao Encontrada!!!</h1>
            <h2>404</h2>
            <Link to="/">Veja todos os Filme!!</Link>
            </div>

    )
}

export default Erro;