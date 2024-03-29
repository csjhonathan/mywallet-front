import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TransactionsPage from './pages/TransactionPage';
import UserContext from './contextAPI/userContext';
import { useState } from 'react';
import EditTransactionPage from './pages/EditTransactionPage.js';
import TransactionContext from './contextAPI/transactionContext.js';
export default function App() {
  const [userData, setUserData] = useState({token : '', username : ''});
  const [editTransactionData, setEditTransactionData] = useState({description : '', value : '', ID : '' });
  return (
    <UserContext.Provider value={{userData, setUserData }} >
      <TransactionContext.Provider value={{ editTransactionData, setEditTransactionData }}>
        <PagesContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
              <Route path="/editar-registro/:tipo" element={<EditTransactionPage />} />
            </Routes>
          </BrowserRouter>
        </PagesContainer>
      </TransactionContext.Provider>
    </UserContext.Provider>
  );
}

const PagesContainer = styled.main`
    background-color: #8c11be;
    width: calc(100vw - 50px);
    max-height: 100vh;
    padding: 25px;
`;
