import styled from 'styled-components';
import { BiExit, BiX } from 'react-icons/bi';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import UserContext from '../contextAPI/userContext.js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function HomePage() {
    const {userData} = useContext(UserContext);
    const [transactions, setTransactions] = useState(null);
    const [total, setTotal] = useState(null);
    const navigate = useNavigate();
    console.log(transactions);
    useEffect( () => {
        if(!userData.token){
            return navigate('/');
        }
        getTransactions();
    },[]);

    async function getTransactions(){
        try{
            const config = {
                headers : {
                    'Authorization' : `Bearer ${userData.token}`
                }
            };

            /* eslint-disable-next-line no-undef */
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, config);
            setTransactions(response.data.transactions);
            setTotal(response.data.total ? Number(response.data.total).toFixed(2) : '00.00');
            
        }catch(err){
            alert(err.response.data.message);
        }
    }

    function newTransaction(type){
        navigate(`/nova-transacao/${type}`);
    }

    function logOut(){
        localStorage.clear();
        navigate('/');
    }

    async function deleteTransaction(ID){
        if(window.confirm('Deseja excluir esta transação ?')){
            try{
                const config = {
                    headers : {
                        'Authorization' : `Bearer ${userData.token}`
                    }
                };
                /* eslint-disable-next-line no-undef */
                await axios.delete(`${process.env.REACT_APP_API_URL}/transactions/${ID}`, config);
                getTransactions();
            }catch(err){
                alert(err.response.data.message);
            }
        }
    }

    return (
        <HomeContainer>
            <Header>
                <h1>Olá, {userData.username}</h1>
                <BiExit onClick={logOut}/>
            </Header>
            <TransactionsContainer hasTransactions = {!(!!transactions && !transactions?.length || !transactions )}>
                {transactions && transactions.length > 0 ?
                    <>
                        <ul>
                            {transactions.map((transaction) => {
                                return (
                                    <ListItemContainer key={transaction.transactionID}>
                                        <div>
                                            <span>{transaction.date}</span>
                                            <strong>{transaction.description}</strong>
                                        </div>
                                        <Value color={transaction.type}>{transaction.value.toFixed(2)} <Delete onClick={() => deleteTransaction(transaction.transactionID)}/> </Value>
                                        
                                    </ListItemContainer>
                                );
                            })
                        
                            }
                        </ul>

                        <article>
                            <strong>Saldo</strong>
                            <Value color={ total >= 0 ? 'deposit' : 'spent' }>{total}</Value>
                        </article>
                    </>
                    :
                    <MessageContainer>
                          Não há registros de entrada ou saída
                    </MessageContainer>}
            </TransactionsContainer>

                

            <ButtonsContainer>
                <button onClick={()=>newTransaction('deposit')}>
                    <AiOutlinePlusCircle />
                    <p>Nova <br /> entrada</p>
                </button>
    
                <button onClick={()=>newTransaction('spent')}>
                    <AiOutlineMinusCircle />
                    <p>Nova <br />saída</p>
                </button>                
            </ButtonsContainer>

        </HomeContainer>
    );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.hasTransactions ? 'initial' : 'center')};
  justify-content: ${(props) => (props.hasTransactions ? 'space-between' : 'center')};
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul{
    max-height : 95%;
    overflow: scroll;
  }
  max-height : 68%;
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === 'deposit' ? 'green' : 'red')};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  width: 150px;
  text-align: center;
  color: #868686;
`;

const Delete = styled(BiX)`
  color: #c6c6c6;
`;