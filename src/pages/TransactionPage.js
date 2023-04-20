import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../contextAPI/userContext.js';

export default function TransactionsPage() {
    const {tipo} = useParams();
    const [form, setForm] = useState({value : '', description : ''});
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();
    function handleForm(key, value){

        setForm({...form, [key] : value});
    }

    useEffect( () => {
        if(!userData.token){
            return navigate('/');
        }
    },[]);
    
    async function sendTransaction(e){
        e.preventDefault();
        const body = {
            value : Number(form.value.replace(',', '.')),
            description : form.description,
            type : tipo,
        };
        try{
            if(!userData.token){
                navigate('/');
            }
            const config = {
                headers : {
                    'Authorization' : `Bearer ${userData.token}`
                }
            };
            /* eslint-disable-next-line no-undef */
            await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, body, config);
            navigate('/home');
        }catch(err){
            alert(err.response.data.message);
        }
    }
    return (
        <TransactionsContainer>
            <h1>Nova TRANSAÇÃO</h1>
            <form onSubmit={sendTransaction}> 
                <input placeholder="Valor" 
                    type = "text"
                    name = "value"
                    required
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                />
                <input placeholder="Descrição" 
                    type="text"
                    name = "description" 
                    required
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                />
                <button>Salvar {tipo === 'deposit' ? 'entrada' : 'saída'}</button>
            </form>
        </TransactionsContainer>
    );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
