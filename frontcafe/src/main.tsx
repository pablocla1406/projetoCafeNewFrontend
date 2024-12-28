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
import ListagemBebida from './page/Listagens/ListagemBebida.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='/cadastroBebida' element={<BebidaCadastro />} />
            <Route path='/cadastroBebida/:id' element={<BebidaCadastro />} />
            <Route path='/cadastroPessoa' element={<PessoaCadastro />} />
            <Route path='/cadastroPessoa/:id' element={<PessoaCadastro />} />
            <Route path='/ListagemBebidas' element={<ListagemBebida />} />
            <Route path='/ListagemPessoas' element={<ListagemPessoa />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>,
)