import { StorageProvider } from './../../providers/storage/storage';

/* importação de bibliotecas */
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

/* importação da pagina Contas */
import { ContasPage } from '../contas/contas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  

  creditos:     number;
  debitos:      number;
  total:        number;
  lista:        string;
  dia_atual:    string;
  mes_atual:    number;
  ano_atual:    number;
  data_atual:   Date;
  inicio;
  contas;
  

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storageProvider: StorageProvider){

    console.log('-> contrutor home');

    // let contas = this.storageProvider.getCreditos();

    // this.creditos = this.numberToReal(contas[0]);
    // this.debitos = this.numberToReal(contas[1]);
    // this.total = this.numberToReal(contas[0 - contas[1]]);
    this.data_atual =  new Date();
    this.contas = this.storageProvider.getContas();
        
  }

  ionViewDidLoad(){
   
    let contas = this.storageProvider.getCreditos();
    this.creditos = this.numberToReal(contas[0]);
    this.debitos = this.numberToReal(contas[1]);
    this.total = this.numberToReal(contas[0] - contas[1]);
  }


  /* função para abrir modal contas */
  abrirModalContas() {
    console.log('-> chamando modal contas');
    let modal = this.modalCtrl.create(ContasPage);

    modal.onDidDismiss(data =>{
      let contas = this.storageProvider.getCreditos();
      this.creditos = this.numberToReal(contas[0]);
      this.debitos  = this.numberToReal(contas[1]);
      this.total    = this.numberToReal(contas[0] - contas[1]);
      this.contas = this.storageProvider.getContas();

      console.log(contas[0]);
      // console.log(contas[1]);
    });

    modal.present();
  }

  /* converte mes de numero para nome  */
  mesAtual(): any{
    
        let mes =  new Date().getMonth();
        
        if(mes == 1) return 'Janeiro';
        else if(mes == 2) return 'Fevereiro';
        else if(mes == 3) return 'Março';
        else if(mes == 4) return 'Abril';
        else if(mes == 5) return 'Maio';
        else if(mes == 6) return 'Junho';
        else if(mes == 7) return 'Julho';
        else if(mes == 8) return 'Agosto';    
        else if(mes == 9) return 'Setembro';
        else if(mes == 10) return 'Outrobro';
        else if(mes == 11) return 'Novembro';
        else if(mes == 12) return 'Dezembro';    
      }

      numberToReal(numero): number {
        var numero = numero.toFixed(2).split('.');
        numero[0] =  numero[0].split(/(?=(?:...)*$)/).join('.');
        console.log('-----> numberToReal()')
        return numero.join(',');
    }

}
