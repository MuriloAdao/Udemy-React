import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import { useContext, useState } from 'react'
import {db,} from '../../services/firebaseConnection'
import {doc, updateDoc} from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function Profile(){
const {user, setUser, storageUser, logout} = useContext(AuthContext);
const [nome, setNome]= useState(user && user.nome);
const [imageAvatar, setImageAvatar] = useState(null);
const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
const [email, setEmail] = useState(user && user.email)

function handleFile(e){
    if(e.target.files[0]){
        const image = e.target.files[0];
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
        }else{
            alert("Envie uma imagem do tipo PNG ou JPEG")
            setImageAvatar(null);
            return;
        }
    }
}

async function handleSubmit(e){
    e.preventDefault();

    if(imageAvatar === null && nome !==''){
        const docRef = doc(db,"users", user.uid)
        await updateDoc(docRef,{
            nome: nome,
        })
        .then(()=> {
            let data={...user, nome:nome}
            setUser(data);
            storageUser(data);
            toast.success("Atualizado com Sucesso");
        })



    }
  





}






    return(
 <div>
    <Header/>
        <div className='content'>
            <Title name="Minha Conta">
                <FiSettings size={25}/>
            </Title>

<div className='container'>
    <form className='form-profile' onSubmit={handleSubmit}>
        <label className='label-avatar'>
            <span>
                <FiUpload color='#FFF' size={25}/>
            </span>
            <input type="file" accepts="image/*" onChange={handleFile}/>
            {avatarUrl === null ?(
                <img src={avatar} alt='Foto de Perfil' width={250} height={250}/>
            ) : (
                <img src={avatarUrl} alt='Foto de Perfil' width={250} height={250}/>
            )}
        </label>

        <label>Nome</label>
        <input type='text' value={nome} onChange={(e)=> setNome(e.target.value)}/>
        <label>Email</label>
        <input type='text' value={email} disabled={true} />

        <button type="submit">Salvar</button>
    </form>
</div>

<div>
    <button className="logout-btn" onClick={()=> logout() }>Sair</button>
</div>
        </div>
           
 </div>
    )
}