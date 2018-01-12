import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {
    console.log('Hello StorageProvider Provider');
  }

  /**
   *  Manipulação do storage
   */

  //  retorna tabela informada em json
  private getTabela(tabela){
    return JSON.parse(localStorage.getItem(tabela));
  }

  private setTabela(nome, tabela){
    let tabaleFormatoString = JSON.stringify(tabela);
    localStorage.setItem(nome, tabaleFormatoString);
    return 1;
  }


  private buscaRegistro(tabela, id, ini=0){

    if(tabela.length == ini ) return -1;
    if(tabela[ini].id == id) return tabela[ini];

    return this.buscaRegistro(tabela, id, ini+1);
  }

  public getRegistro(tabela, id){
    let tabelaObj = this.getTabela(tabela);    

    return this.buscaRegistro(tabelaObj, id);
  }
  

  private setCategoriasIniciais(){

    let categoriasIniciais = [
      { id: 1, nome: 'alimentação' },
      { id: 2, nome: 'contas fixas' },
      { id: 3, nome: 'lazer' },
      { id: 4, nome: 'cartão de crédito' }
    ]
      // ex: categoriasIniciais[0].id
        
    let categorias = JSON.stringify(categoriasIniciais)    
    localStorage.setItem('categorias', categorias);    

    return 1;
  }  


  private setContasIniciais(){
    let contasIniciais = [ ];
    let contas = JSON.stringify( contasIniciais )
    localStorage.setItem('contas', contas)


    return 1;
  }

  public iniciaDbSeNaoExistir(){

    // cria tb de categorias se não existir
    if(!localStorage.categorias){
      this.setCategoriasIniciais();
      console.log('> tb categorias criada com sucesso');
    } else {
        console.log('> tb categorias já existe');          
      }

    // cria tb contas se não existir
    if(!localStorage.contas){
      this.setContasIniciais();
      console.log('> tb contas criada');
    } else {
      console.log('> tb contas já existe')
    }
    
    console.log('banco iniciado com sucesso no LocalStorage');
    return 1;
  }

  /*****************************
   *          Contas
   *****************************/

  // OK
  public setConta(registro){
    let tabelaObj = this.getTabela('contas');

    tabelaObj.unshift(registro);
    console.log(tabelaObj);
    this.setTabela('contas', tabelaObj);    
  }

  // OK
  public getConta(id){
    return this.getRegistro('contas', id);
  }

  // OK
  public getContas(){
    return this.getTabela('contas');
  }

  // ok
  public getCreditos(){
    var creditos = 0;
    var debitos  = 0;

    let tabela = this.getTabela('contas');

    if( !tabela ) return [creditos, debitos]

    for(let i=0; i < tabela.length; i++){
      
      if(tabela[i].tipo == 'credito')
        creditos += tabela[i].valor;                
      
      if(tabela[i].tipo == 'debito')
        debitos += tabela[i].valor;        
    }    

    return [creditos, debitos];     
  }

  /*****************************
  *          Categoria
  *****************************/

  // Categorias
  public setCategoria(nomeCategoria){
    let categoriasTb = this.getTabela('categorias');    
   
    categoriasTb.push({
      id: categoriasTb.length,
      nome: nomeCategoria
    });
    
    console.log(categoriasTb);
    this.setTabela('categorias', categoriasTb);

    return 1;
  }

  public getCategoria(){}
  
  public getCategorias(){
    let categoriasTb = this.getTabela('categorias');

    if(!categoriasTb) return -1;
    
    console.log(categoriasTb);
    return categoriasTb;
  }

  // public deleteCategoria(id){
  //   let tabela = this.getTabela('categorias');
  //   let novaTabela;
  //   let indice = -1;

  //   for(let i = 1; i < tabela.length; i++){
  //     if(tabela[i].id == id){
  //       indice = i;
  //       break;
  //     }
  //   }

  //   novaTabela = tabela.slice(indice, 1);
  //   console.log('nova tabela> ',tabela);
  // }
  
}
