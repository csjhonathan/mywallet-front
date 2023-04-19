import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyWalletLogo from '../components/MyWalletLogo';
import axios from 'axios';
import { useState } from 'react';
export default function SignUpPage() {
    const [form, setForm] = useState({nome : '', email : '', senha : '', confirma : ''});
    
    function handleForm(key, value){
        setForm({...form, [key] : value});
    }
    async function registerUser(e){
        e.preventDefault();
        if(form.confirma !==  form.senha) {
            return alert('As senhas devem ser iguais!');
        }
        const body = {
            nome : form.nome,
            email : form.email,
            senha : form.senha
        };
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);

        }catch(err){
            alert(err.response.data.message);
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
                />
                <input placeholder="E-mail" 
                    type="email" name='email' 
                    value = {form.email} 
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    required
                />
                <input placeholder="Senha" 
                    type="password" 
                    name='senha' 
                    autoComplete="new-password" 
                    value = {form.senha} 
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    required
                    minLength={3}
                />
                <input placeholder="Confirme a senha" 
                    name='confirma' 
                    type="password" 
                    autoComplete="new-password" 
                    value={form.confirma} 
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    required
                    minLength={3}
                />
                <button>Cadastrar</button>
            </form>

            <Link>
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
`;
