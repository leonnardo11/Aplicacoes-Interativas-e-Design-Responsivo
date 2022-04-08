import { Injectable } from '@angular/core';
import { findIndex } from 'rxjs';
import { Jogo } from '../model/jogo';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  private jogos = new Array<Jogo>();
  private auto = 1; //Variavel de Incremento de ID
  constructor() {}

  inserir(jogo: Jogo) {
    jogo.id = this.auto; //Atribui o ID
    this.jogos.push(jogo); //Adiciona o jogo no array
    this.auto++; //Incrementa o ID
    this.salvar(); //Salva o jogo no localStorage
  }

  listar() {
    this.carregar();
    return this.jogos; //Retorna o array de jogos
  }

  remover(id?: number) {
    this.jogos = this.jogos.filter((jogo) => {
      return id !== jogo.id;
    });
    //Filtra o array de jogos, removendo o jogo com o ID passado
    /*for(let i = 0; i < this.jogos.length; i++) {
      if(id === this.jogos[i].id) {
        this.jogos.splice(i, 1);
        break;
      }
    }*/ //Filtra o array de jogos, removendo o jogo com o ID passado

    this.salvar(); //Salva o array de jogos no localStorage
  }

  editar(jogo: Jogo) {
    const indice = this.jogos.findIndex((j) => {
      return j.id === jogo.id; //Retorna o indice do jogo
    });
    if (indice >= 0) {
      this.jogos[indice] = jogo; //Substitui o jogo no array
    }
    this.salvar(); //Salva o array de jogos no localStorage
  }

  salvar() {
    localStorage.setItem('idGerado', this.auto.toString()); //Salva o ID no localStorage como string
    localStorage.setItem('jogos', JSON.stringify(this.jogos)); //Salva o array de jogos no localStorage como string
  }

  carregar() {
    const idGeradoSalvo = localStorage.getItem('idGerado'); //Pega o ID salvo no localStorage
    if (idGeradoSalvo) {
      //Se existir um ID salvo no localStorage
      this.auto = Number(idGeradoSalvo); //Converte o valor para number
    }

    const jogosSalvos = localStorage.getItem('jogos'); //Pega o array de jogos salvo no localStorage
    if (jogosSalvos) {
      //Se existir um array de jogos salvo no localStorage
      this.jogos = JSON.parse(jogosSalvos); //Converte o valor para array de jogos
    }
  }
}
