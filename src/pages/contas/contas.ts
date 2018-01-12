import { StorageProvider } from './../../providers/storage/storage';
import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CategoriasPage } from './../categorias/categorias';
import { ValorPage } from './../valor/valor';



@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {  
  
  @ViewChild('textInput') textInput;  
  
  public tipo: any;
  public categoria = 'Comida';
  public descricao;
  public valor = 0.00;
  public data;  
  
  visor = this.numberToReal(0);

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,     
     private storageProvider: StorageProvider) {
    console.log('-----> construtorContas()');

    this.data = new Date().toISOString();
  }

  setDescricao(descricao){
    this.descricao = descricao;
  }

  closeCallback() {
    // quando teclado for fechado
    console.log('-----> teclado fechado');

  }

  numberToReal(numero): number {
    var numero = numero.toFixed(2).split('.');
    numero[0] =  numero[0].split(/(?=(?:...)*$)/).join('.');
    console.log('-----> numberToReal()')
    return numero.join(',');
}

  presentModalCategorias() {
    console.log('-----> presentModalCategorias()');
    let modal = this.modalCtrl.create(CategoriasPage);

    modal.onDidDismiss(data =>{
      this.categoria = data.nome;
      console.log(this.categoria);
    });
    modal.present();
  }

  presentModalValor() {
    console.log('-----> presentModalValor()');
    let modal = this.modalCtrl.create(ValorPage);    

    modal.onDidDismiss((data) => {
      if(data){
        console.log('-----> ondidmismiss() ', data.valor);
        this.valor = parseFloat(data.valor);
        this.visor = this.numberToReal(parseFloat(data.valor));
    }
    });
    modal.present();
  }

  fecharContas():void{
    this.navCtrl.pop();
  }

  public insereConta(){
    let conta = {      
      descricao: this.descricao,
      categoria: this.categoria,
      tipo: this.tipo,
      valor: this.valor,
      data: this.data,
    }

    this.storageProvider.setConta(conta);
    console.log('> conta inserida com sucesso');

    this.navCtrl.pop();
  }
}