import App from '../../App'
import Nome from '../Nome';
import { UserContext } from '../../contexts/user';
import { useContext } from 'react';

function Aluno(){
    const {alunos}=useContext(UserContext);
    return(
        <div>
        <h2>Componentes Alunos: {alunos}</h2>
<Nome/>
        </div>
    );
}

export default Aluno;