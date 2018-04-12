import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { listAuthors } from "./services/authors/authors.js"
import { createAuthor } from "./services/authors/authors.js"
import ErrorHandler from './ErrorHandler'

import InputCustomizado from './components/InputCustomizado/InputCustomizado'
import BotaoSubmit from'./components/BotaoSubmit/BotaoSubmit'

/*
--------------
Formulário Autor
--------------
*/

class FormularioAutor extends Component {
  constructor() {
    super();

    this.state = { nome: "", email: "", senha: "" }

    this.submitForm = this.submitForm.bind(this)
    this.setName = this.setName.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setPass = this.setPass.bind(this)
  }

  submitForm(event) {
    event.preventDefault()
    let self = this
    console.log("Dados sendo enviados")

    let author = { nome: this.state.nome, email: this.state.email, senha: this.state.senha }   
    

    createAuthor(author)
      .then(res => {
        console.log("cadastrado com sucesso!")
        PubSub.publish('atualiza-lista-autores', res)
        
        self.setState({
          nome:'', 
          email: '', 
          senha:''
        })

      }).catch(err => {
        if (err.response.status === 400) {
          new ErrorHandler().showErrors(err.response.data)
        }
      })
  }

  setName(event) {
    this.setState({ nome: event.target.value })
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPass(event) {
    this.setState({ senha: event.target.value })
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setName} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setPass} label="Senha" />
          <BotaoSubmit label="Gravar" />
        </form>
      </div>
    )
  }
}

/*
--------------
Tabela Autores
--------------
*/

class TabelaAutores extends Component {  

  render() {
    return <div>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.lista.map(author => {
            return <tr key={author.id}>
                <td>{author.nome}</td>
                <td>{author.email}</td>
              </tr>
          })}
        </tbody>
      </table>
    </div>
  }
}


/*
--------------
AutorBox
--------------
*/

export default class AutorBox extends Component {
  
  constructor() {
    super()

    this.state = {lista: []}
  }

  componentDidMount() {
    let self = this

    listAuthors().then(res => {
      self.setState({
        lista:res
      })
    })

    PubSub.subscribe('atualiza-lista-autores', (topico, listaAutores) => {
      self.setState({ lista: listaAutores })
    })
  }

  render() {
    return <div className="content" id="content">
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor />
          <TabelaAutores lista={this.state.lista} />
        </div>
      </div>;
  }
}
