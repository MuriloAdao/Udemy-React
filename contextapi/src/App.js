import Aluno from './components/Alunos'
import {useState} from 'react'
import UserProvider from './contexts/user';

function App() {
  
  return(
  <UserProvider>
    <div>
      <h1>Escola</h1>
      <hr/>
<Aluno/>
    </div>
    </UserProvider>
  );
}

export default App;
