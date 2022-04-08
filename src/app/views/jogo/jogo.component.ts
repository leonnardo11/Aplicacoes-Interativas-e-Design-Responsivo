import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/model/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css'],
})
export class JogoComponent implements OnInit {
  jogos = new Array<Jogo>();
  jogoAtual?: Jogo;
  estaEditando = false;

  constructor(private gameService: JogoService) {}

  ngOnInit(): void {
    this.atualizar();
  }

  atualizar() {
    this.jogos = this.gameService.listar(); //Retorna o array de jogos
  }

  novo() {
    this.jogoAtual = new Jogo();
    this.estaEditando = false;
  }

  salvar() {
    if (this.jogoAtual) {
      if(!this.estaEditando){
        this.gameService.inserir(this.jogoAtual);
      }else{
        this.gameService.editar(this.jogoAtual);
      }
    }
    this.cancelar();
    this.atualizar();
  }

  cancelar() {
    this.jogoAtual = undefined;
  }

  remover(id?: number) {
    this.gameService.remover(id);
    this.atualizar();
  }

  selecionar(jogo: Jogo) {
    this.jogoAtual = jogo;
    this.estaEditando = true;
  }
}
