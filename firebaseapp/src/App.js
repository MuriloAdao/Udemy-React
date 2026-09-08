import {useState, useEffect} from 'react';
import {db, auth} from './firebaseConnection';
import './App.css';
import {doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');
const [posts, setPosts] = useState([]);
const [idpost,setIdpost] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [user, setUser] = useState(false);
const [userDetail, setUserDetail] = useState({});

useEffect(()=>{
  async function loadPost() {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      let listaPost = [];
      snapshot.forEach((doc) =>{
        listaPost.push({
          id:doc.id,
          titulo: doc.data().titulo,
          autor:doc.data().autor,
        })
      })
      setPosts(listaPost);
    }) 
  }
  loadPost();
},[])

useEffect(()=> {
  async function checkLogin(){
    onAuthStateChanged(auth,(user) =>{
      if(user){
        console.log(user);
        setUser(true);
        setUserDetail({
          uid: user.uid,
          email: user.email
        })
      }else{
        setUser(false);
        setUserDetail({});
      }
    })
  }
checkLogin();
})
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

 async function editarPost(){
  const docRef = doc(db, "posts", idpost)
  await updateDoc(docRef, {
    titulo: titulo,
    autor: autor
  })
  .then(()=>{
    console.log("Post Atualizado")
    setIdpost('')
    setTitulo('')
    setAutor('')
  })
  .catch(()=>{
    console.log("Erro ao atualizar post")
  })
}
async function excluirPost(id){
  const docRef= doc(db,"posts", id)
  await deleteDoc(docRef)
.then(()=>{
  console.log("Post Excluido")
})
.catch(()=>{
  console.log("Erro ao Excluir")
})
}

async function novoUsuario(){
  await createUserWithEmailAndPassword(auth, email, senha)
.then (()=>{
  console.log("Cadastrado com sucesso")
setEmail('')
setSenha('')
})
.catch((error)=> {
 if (error.code === 'auth/weak-password'){
  alert("Senha muito fraca")
 }else if(error.code === 'auth/email-already-in-use'){
  alert("Email ja existe")
 }
})
}

async function entrarLogin (){
  await signInWithEmailAndPassword(auth, email, senha)
  .then((value)=> {
    console.log("Login com Sucesso")
    console.log(value.user);

    setUserDetail({
      uid: value.user.uid,
      email: value.user.email,
    })
    setUser(true);

    setEmail('')
    setSenha('')
  })
  .catch (()=> {
    console.log("Erro no Login")
  })
}
async function logoutUser() {
  await signOut(auth)
  setUser(false);
  setUserDetail({});
  
}
  return (
    <div>
<h1>ReactJs + Firebase</h1>
{user && (
  <div>
    <strong>Seja Bem vindo (Voce esta Logado)</strong><br/><br/>
    <span>ID:{userDetail.uid} - Email:{userDetail.email}</span><br/>
    <button onClick={logoutUser}>Sair da Conta</button>
    </div>
)}
<div className="container">
<h2> Usuario</h2>
<label> Email:</label>
<input placeholder='Digite seu Email...'
value= {email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label> Senha:</label>
<input placeholder='Senha'
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>
<button onClick={novoUsuario}>Cadastrar</button>
<button onClick={entrarLogin}>Login</button>
</div>
<br/><br/>
<hr/>

<div className="container">
<h2> Posts </h2>
<label>Id do Post</label>
<input placeholder='Digite o id do Post:'
value={idpost}
onChange={(e)=>setIdpost(e.target.value)}
/>

<label>Titulo:</label>
<textarea type='text' placeholder='Digite o Titulo' value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>
<label>Autor:</label>
<textarea type='text' placeholder='Digite o Autor' value={autor} onChange={(e)=> setAutor(e.target.value)}/>
<button onClick={handleAdd}>Cadastrar</button>
<button onClick={buscarPost}>Buscar</button>
<button onClick={editarPost}>Atualizar Post</button>

<ul>
  {posts.map((post) =>{
    return(
      <li>
      <strong> ID: {post.id} </strong> <br/>
      <span>Titulo: {post.titulo}</span> <br/>
      <span>Autor:{post.autor}</span> <br/>
      <button onClick={() => excluirPost(post.id)}>Excluir</button>
        </li>

    )
  })}
  </ul>

</div>
    </div>
  );
}

export default App;
