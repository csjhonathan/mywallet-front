import { useState, useContext } from 'react';
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

    async function sendTransaction(e){
        e.preventDefault();
        const body = {
            value : form.value.replace(',', '.'),
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
            console.log(err);
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
                <button>Salvar TRANSAÇÃO</button>
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
