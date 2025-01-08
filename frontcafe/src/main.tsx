import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home.tsx'
import BebidaCadastro from './page/Cadastro/BebidaCadastro.tsx'
import ListagemPessoa from './page/Listagens/ListagemPessoa.tsx'
import PessoaCadastro from './page/Cadastro/PessoaCadastro.tsx'
import ListagemBebida from './page/Listagens/ListagemBebida.tsx'
import PedidoCadastro from './page/Cadastro/PedidoCadastro.tsx'
import ListagemCadastro from './page/Listagens/ListagemCadastro.tsx'
import LoginPage from './page/Login.tsx'
import NavBar from './components/navBar/NavBar.tsx'
import { PrivateRoute } from './components/Formularios/FormLogin/PrivateRoute.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <App>
        <Routes>
          {/* Original routes with validation (commented out for now)
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<NavBar />}>
              <Route path='/Home' element={<Home />} />
              
              <Route element={<PrivateRoute requiredPermission="ADMIN" />}>
                <Route path='/cadastroBebida' element={<BebidaCadastro />} />
                <Route path='/cadastroPessoa' element={<PessoaCadastro />} />
                <Route path='/cadastroPedido' element={<PedidoCadastro/>}/>
                <Route path='/cadastroBebida/:id' element={<BebidaCadastro />} />
                <Route path='/cadastroPessoa/:id' element={<PessoaCadastro />} />
                <Route path='/cadastroPedido/:id' element={<PedidoCadastro/>}/>
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>}/>
              </Route>

              <Route element={<PrivateRoute requiredPermission="AUX" />}>
                <Route path='/cadastroBebida' element={<BebidaCadastro />} />
                <Route path='/cadastroBebida/:id' element={<BebidaCadastro />} />
                <Route path='/cadastroPedido' element={<PedidoCadastro/>}/>
                <Route path='/cadastroPedido/:id' element={<PedidoCadastro/>}/>
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>}/>
              </Route>

              <Route element={<PrivateRoute requiredPermission="USER" />}>
                <Route path='/ListagemPessoas' element={<ListagemPessoa />} />
                <Route path='/ListagemPedidos' element={<ListagemCadastro/>}/>
                <Route path='/ListagemBebidas' element={<ListagemBebida />} />
            </Route>
          </Route>
          */}

          {/* Temporary routes without login validation */}
          <Route element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/cadastroBebida" element={<BebidaCadastro />} />
            <Route path="/cadastroPessoa" element={<PessoaCadastro />} />
            <Route path="/cadastroPedido" element={<PedidoCadastro />} />
            <Route path="/cadastroBebida/:id" element={<BebidaCadastro />} />
            <Route path="/cadastroPessoa/:id" element={<PessoaCadastro />} />
            <Route path="/cadastroPedido/:id" element={<PedidoCadastro />} />
            <Route path="/ListagemBebidas" element={<ListagemBebida />} />
            <Route path="/ListagemPedidos" element={<ListagemCadastro />} />
            <Route path="/ListagemPessoas" element={<ListagemPessoa />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>,
)