import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './page/Home.tsx';
import BebidaCadastro from './page/Cadastro/BebidaCadastro.tsx';
import ListagemPessoa from './page/Listagens/ListagemPessoa.tsx';
import PessoaCadastro from './page/Cadastro/PessoaCadastro.tsx';
import ListagemBebida from './page/Listagens/ListagemBebida.tsx';
import PedidoCadastro from './page/Cadastro/PedidoCadastro.tsx';
import ListagemCadastro from './page/Listagens/ListagemCadastro.tsx';
import LoginPage from './page/Login.tsx';
import NavBar from './components/navBar/NavBar.tsx';
import { PrivateRoute } from './components/Formularios/FormLogin/PrivateRoute.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <App>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<NavBar />}>
              <Route path='/Home' element={<Home />} />
              
              {/* Base routes - USER level */}
              <Route element={<PrivateRoute requiredPermission="USER" />}>
                <Route path='/ListagemPessoas' element={<ListagemPessoa />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>} />
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
              </Route>

              {/* AUX level routes */}
              <Route element={<PrivateRoute requiredPermission="AUX" />}>
                <Route path='/cadastroBebida' element={<BebidaCadastro />} />
                <Route path='/cadastroBebida/:id' element={<BebidaCadastro />} />
                <Route path='/cadastroPedido' element={<PedidoCadastro/>} />
                <Route path='/cadastroPedido/:id' element={<PedidoCadastro/>} />
                <Route path='/cadastroPessoa' element={<PessoaCadastro />} />
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>} />
                <Route path='/ListagemPessoas' element={<ListagemPessoa />} />
              </Route>

              {/* ADMIN level routes - tem acesso a tudo */}
              <Route element={<PrivateRoute requiredPermission="ADMIN" />}>
                <Route path='/cadastroBebida' element={<BebidaCadastro />} />
                <Route path='/cadastroBebida/:id' element={<BebidaCadastro />} />
                <Route path='/cadastroPedido' element={<PedidoCadastro/>} />
                <Route path='/cadastroPedido/:id' element={<PedidoCadastro/>} />
                <Route path='/cadastroPessoa' element={<PessoaCadastro />} />
                <Route path='/cadastroPessoa/:id' element={<PessoaCadastro />} />
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>} />
                <Route path='/ListagemPessoas' element={<ListagemPessoa />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);