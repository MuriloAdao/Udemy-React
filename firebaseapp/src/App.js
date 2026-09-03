import {useState} from 'react';
import {db} from './firebaseConnection';
import './App.css';
import {doc, setDoc, collection, addDoc, getDoc, getDocs} from 'firebase/firestore';

function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');
const [posts, setPosts] = useState([]);

async function handleAdd(){
//await setDoc(doc(db, "posts", "12345"), {
//  titulo: titulo, autor: autor,
//})

//.then(()=>{
 // console.log("Dados Registrados");
//})
//.catch((error)=>{
//  console.log("Erro ao Cadastrar" + error)
//})
await addDoc(collection(db, "posts"), {
  titulo: titulo,
  autor: autor,
})
.then(()=> {
  console.log("cadastrado");
  setAutor('');
  setTitulo('');
})
.catch((error)=>{
  console.log("Erro" + error);
})
}
async function buscarPost() {
 // const postRef = doc(db,"posts", "123")
 // await getDoc(postRef)
//  .then((snapshot)=> {
 //   setAutor(snapshot.data().autor)
 //   setTitulo(snapshot.data().titulo)
 // })
  //.catch(()=>{
  //  console.log("Erro");
 // })
  
//}

const postRef = collection(db, "posts");
await getDocs(postRef)
.then ((snapshot)=> {
  let lista=[];

  snapshot.forEach((doc)=> {
    lista.push({
      id: doc.id,
      titulo: doc.data().titulo,
      autor:doc.data().autor,
    })
  })

  setPosts(lista);

})
.catch((error) => {
  console.log("Erro em Buscar")
})
}
  return (
    <div>
<h1>ReactJs + Firebase</h1>
<div className="container">
<label>Titulo:</label>
<textarea type='text' placeholder='Digite o Titulo' value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>
<label>Autor:</label>
<textarea type='text' placeholder='Digite o Autor' value={autor} onChange={(e)=> setAutor(e.target.value)}/>
<button onClick={handleAdd}>Cadastrar</button>
<button onClick={buscarPost}>Buscar</button>

<ul>
  {posts.map((post) =>{
    return(
      <li key={post.id}>
        <span>Titulo: {post.titulo}</span> <br/>
        <span>Autor:{post.autor}</span> <br/>
        </li>

    )
  })}
  </ul>

//Teste

</div>
    </div>
  );
}

export default App;
