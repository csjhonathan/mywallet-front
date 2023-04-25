/* eslint-disable no-undef, no-unused-vars*/
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contextAPI/userContext.js';
import TransactionContext from '../contextAPI/transactionContext.js';
import axios from 'axios';
import DotsLoader from '../components/DotsLoader.js';
export default function EditTransactionPage(){
    const {tipo} = useParams();
    const navigate = useNavigate();
    const {userData } = useContext(UserContext);
    const [disabled, sedDisabled] = useState(false);
    const {editTransactionData} = useContext(TransactionContext);
    const [form, setForm] = useState({value :editTransactionData?.value.toFixed(2).replace('.', ',') , description : editTransactionData?.description});
    
    useEffect( () => {
        if(!userData.token ){
            return navigate('/');
        }
    },[]);

    function handleForm(key, value){

        setForm({...form, [key] : value});
    }

    async function editTransaction(e){
        e.preventDefault();
        sedDisabled(true);
        try{
            
            const body =  {
                value : Number(form.value.replace(',', '.')),
                description : form.description,
                type : tipo
            };
            const config = {
                headers : {
                    'Authorization' : `Bearer ${userData.token}`
                }
            };
            const ID = editTransactionData.ID;
            await axios.put(`${process.env.REACT_APP_API_URL}/transactions/${ID}`, body, config);
            sedDisabled(false);
            navigate('/home');
        }catch(err){
            sedDisabled(false);
            if(err.response.status === 401){
                alert(`${err.response.data.message} Você será redirecionado para a tela de login!`);
                logOut();
                navigate('/');
            }else{
                alert(err.response.data.message);
            }
        }
    }

    return(
        <TransactionsContainer>
            <h1>Editar {tipo === 'deposit' ? 'entrada' : 'saída'}</h1>
            <form onSubmit={editTransaction}> 
                <input placeholder="Valor" 
                    type = "text"
                    name = "value"
                    required
                    value={form.value}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    disabled = {disabled}
                />
                <input placeholder="Descrição" 
                    type="text"
                    name = "description" 
                    required
                    value={form.description}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    disabled = {disabled}
                />
                <SendButton disabled = {disabled}>{disabled ? <DotsLoader/> : `Atualizar ${tipo === 'deposit' ? 'entrada' : 'saída'}`}</SendButton>
                <CancelButton disabled = {disabled} onClick={()=> navigate('/home')}>Cancelar</CancelButton>
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

const SendButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 48px;
`;

const CancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 48px;
`;