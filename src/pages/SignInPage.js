import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MyWalletLogo from '../components/MyWalletLogo';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../contextAPI/userContext';
import { useNavigate } from 'react-router-dom';
export default function SignInPage() {
    const [form, setForm] = useState({email : '', senha : ''});
    const {userData, setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    function handleForm(key, value){
        setForm({...form, [key] : value});
    }
    useEffect(()=>{
        if(localStorage.token && localStorage.userName ){
            setUserData({...userData, token : localStorage.token, username : localStorage.userName});
            navigate('/home');
        }
    }, []);
    async function tryToLogin(e){
        e.preventDefault();

        const body = {
            email : form.email,
            senha : form.senha
        };

        try{
            /* eslint-disable-next-line no-undef */
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);
            setUserData({...userData, token : response.data.token, username : response.data.nome});

            localStorage.clear();
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.nome);

            navigate('/home');
        }catch(err){
            alert(err.response.data.message);
        }
    }
    return (
        <SingInContainer>
            <form onSubmit={(e) => tryToLogin(e)}>
                <MyWalletLogo />
                <input placeholder="E-mail" 
                    type="email"
                    required
                    value = {form.email}
                    name='email' 
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                />
                <input placeholder="Senha" 
                    type="password" 
                    autoComplete="new-password"
                    required
                    value={form.senha}
                    name='senha' 
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    minLength={3}
                />
                <button>Entrar</button>
            </form>

            <Link to = {'/cadastro'}>
        Primeira vez? Cadastre-se!
            </Link>
        </SingInContainer>
    );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: white;
        text-decoration: none;
        padding-top: 30px;
    }
`;
