export class Jogo {
  id?: number;
  nome: string;
  genero: string;
  plataforma: string;
  status = 'N/A';

  constructor(nome = '', genero = '', plataforma = '') {
    this.nome = nome;
    this.genero = genero;
    this.plataforma = plataforma;
  }
}
