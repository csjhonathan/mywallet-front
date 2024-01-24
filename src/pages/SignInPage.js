import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MyWalletLogo from '../components/MyWalletLogo';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../contextAPI/userContext';
import { useNavigate } from 'react-router-dom';
import DotsLoader from '../components/DotsLoader.js';
export default function SignInPage() {
  const [form, setForm] = useState({email : '', senha : ''});
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  function handleForm(key, value){
    setForm({...form, [key] : value});
  }
  useEffect(()=>{
    if(localStorage.getItem('myWalletData')){
      const {token, username} = JSON.parse(localStorage.getItem('myWalletData'));
      if(token && username ){
        setUserData({...userData, token, username});
        navigate('/home');
      }
    }
  }, []);
  async function tryToLogin(e){
    e.preventDefault();

    const body = {
      email : form.email,
      senha : form.senha
    };

    setDisabled(true);
    try{
      /* eslint-disable-next-line no-undef */
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);
      const myWalletData = {...userData, token : response.data.token, username : response.data.nome};

      localStorage.setItem('myWalletData', JSON.stringify(myWalletData));
      setUserData({...userData, token : response.data.token, username : response.data.nome});
      setDisabled(false);
      navigate('/home');
    }catch(err){
      alert(err.response.data.message);
      setDisabled(false);
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
          disabled = {disabled}
        />
        <input placeholder="Senha" 
          type="password" 
          autoComplete="new-password"
          required
          value={form.senha}
          name='senha' 
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          minLength={3}
          disabled = {disabled}
        />
        <SiginButton disabled = {disabled} > { disabled ? <DotsLoader/> : 'Entrar' } </SiginButton>
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

const SiginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 48px;
`;
