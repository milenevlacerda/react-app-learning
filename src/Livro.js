import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { listBooks } from './services/book/books'
import { createBook } from './services/book/books'
import ErrorHandler from './ErrorHandler'

import InputCustomizado from './components/InputCustomizado/InputCustomizado'
import BotaoSubmit from './components/BotaoSubmit/BotaoSubmit'

/*
--------------
Formulário Livro
--------------
*/

class FormularioLivro extends Component {
  constructor() {
    super();

    this.state = { titulo: "", preco: "", autorId: "" }

    this.submitForm = this.submitForm.bind(this)
    this.setTitulo = this.setTitulo.bind(this)
    this.setPreco = this.setPreco.bind(this)
    this.setAutorId = this.setAutorId.bind(this)
  }

  submitForm(event) {
    event.preventDefault()
    let self = this
    console.log("Dados sendo enviados")

    let book = { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }   
    

    createBook(book)
      .then(res => {
        console.log("cadastrado com sucesso!")
        PubSub.publish('atualiza-lista-autores', res)
        
        self.setState({
          titulo:'', 
          preco: '', 
          autorId:''
        })

      }).catch(err => {
        if (err.response.status === 400) {
          new ErrorHandler().showErrors(err.response.data)
        }
      })
  }

  setTitulo(event) {
    this.setState({ titulo: event.target.value })
  }

  setPreco(event) {
    this.setState({ preco: event.target.value })
  }

  setAutorId(event) {
    this.setState({ autorId: event.target.value })
  }

  render() {
    return <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
          <InputCustomizado id="email" type="text" name="email" value={this.state.preco} onChange={this.setPreco} label="Preço" />
          <div className="pure-control-group">
            <label htmlFor={autorId}>Autor }</label>
            <select id="autorId" name="autorId"  onChange={this.setAutorId}>
              <option>Selecione o autor</option>
              {
                this.props.autores.map((author) => {
                  return <option value="author.id ">{author.nome}</option>
                })
              }
            </select> 
          </div>
          <BotaoSubmit label="Gravar" />
        </form>
      </div>;
  }
}

/*
--------------
Tabela Livros
--------------
*/

class TabelaLivros extends Component {
  constructor() {
    super()

    this.state = { 
      lista: [],
      autores: [] 
    };
  }

  componentDidMount() {
    let self = this

    listAuthors().then(res => {
      self.setState({
        lista: res
      })
    })

    PubSub.subscribe("atualiza-lista-livros", (topico, listaLivros) => {
      self.setState({ lista: listaLivros })
    })
  }

  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.titulo}</td>
                  <td>{book.preco}</td>
                  <td>{book.autor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}



export default class LivroBox extends Component {
  render() {
    return <div className="content" id="content">
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivro autores={this.state.autores}/>
          <TabelaLivros lista={this.state.lista} />
        </div>
      </div>;
  }
}
