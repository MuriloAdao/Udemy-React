import {useState, useEffect , createContext } from 'react';
import {auth, db} from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser]= useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false);
const navigate = useNavigate();

//Login
function signIn(email, password){
    console.log(email);
    console.log(password);
    alert("Usuario Logado")
}

//Cadastrando
async function signUp (email, password, nome){
setLoadingAuth(true);

await createUserWithEmailAndPassword(auth,email,password)
.then(async (value)=> {
    let uid = value.user.uid
    await setDoc(doc(db,"users", uid), {
        nome: nome,
        avatarUrl:null
    })
    .then(()=>{
       let data={
        uid:uid, nome:nome, email:value.user.email,
        avatarUrl: null
       };
       setUser(data);
       storageUser(data);
        setLoadingAuth(false);
        toast.success("Seja bem-vindo");
        navigate("/dashboard");
    })
})
.catch ((error)=>{
    console.log(error);
    setLoadingAuth(false);
})
}

    function storageUser(data){
        localStorage.setItem('@dbchamadasPRO', JSON.stringify(data))
    }

return(
    <AuthContext.Provider 
    value={{signed: !!user, user, signIn, signUp, loadingAuth}}>
{children}
    </AuthContext.Provider>
)
}

export default AuthProvider;