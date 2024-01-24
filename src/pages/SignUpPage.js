import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyWalletLogo from '../components/MyWalletLogo';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DotsLoader from '../components/DotsLoader.js';
export default function SignUpPage() {
  const [form, setForm] = useState({nome : '', email : '', senha : '', confirma : ''});
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  function handleForm(key, value){
    setForm({...form, [key] : value});
  }
  async function registerUser(e){
    e.preventDefault();
    setDisabled(true);
    if(form.confirma !==  form.senha) {
      setDisabled(false);
      return alert('As senhas devem ser iguais!');
    }
    const body = {
      nome : form.nome,
      email : form.email,
      senha : form.senha
    };
    try{
      /* eslint-disable-next-line no-undef */
      await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
      navigate('/');
      setDisabled(false);
    }catch(err){
      alert(err.response.data.message);
      setDisabled(false);
    }
  }
  return (
    <SingUpContainer>
      <form onSubmit={(e) => registerUser(e)}>
        <MyWalletLogo />
        <input placeholder="Nome" 
          type="text" name='nome' 
          value={form.nome} 
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          required
          disabled = {disabled}
        />
        <input placeholder="E-mail" 
          type="email" name='email' 
          value = {form.email} 
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          required
          disabled = {disabled}
        />
        <input placeholder="Senha" 
          type="password" 
          name='senha' 
          autoComplete="new-password" 
          value = {form.senha} 
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          required
          minLength={3}
          disabled = {disabled}
        />
        <input placeholder="Confirme a senha" 
          name='confirma' 
          type="password" 
          autoComplete="new-password" 
          value={form.confirma} 
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          required
          minLength={3}
          disabled = {disabled}
        />
        <SigupButton disabled = {disabled} >{disabled ? <DotsLoader/> :'Cadastrar' }</SigupButton>
      </form>

      <Link to = {'/'}>
                Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
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

const SigupButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 48px;
`;

