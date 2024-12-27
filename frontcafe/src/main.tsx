import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home.tsx'
import BebidaCadastro from './page/Cadastro/BebidaCadastro.tsx'
import ListagemPessoa from './page/Listagens/ListagemPessoa.tsx'
import PessoaCadastro from './page/Cadastro/PessoaCadastro.tsx'
import NavBar from './components/navBar/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='/bebida-cadastro' element={<BebidaCadastro />} />
            <Route path='/pessoa-cadastro' element={<PessoaCadastro />} />
            <Route path='/pedido-cadastro' element={} />
            <Route path='/listagem-pedidos' element={} />
            <Route path='/listagem-bebidas' element={} />
            <Route path='/listagem-pessoa' element={<ListagemPessoa />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>,
)