// import { ContasPage } from './../contas/contas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-valor',
  templateUrl: 'valor.html',
})
export class ValorPage {

  valor;
  visor;
  callback;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log('-----> contrutorValor()');
    this.valor = 0;
    this.visor = '0,00';
    this.callback = this.navParams.get("callback");
  }

  inputValor(numeroClicado):void{
    let max = 999999999;
    let n = parseInt(numeroClicado);    

    if(parseInt(this.valor+''+n) < max){
      this.valor = parseInt(this.valor+''+n);
      this.visor = this.numberToReal(this.valor/100);
    }    
  }

  numberToReal(numero): number {
    console.log('-----> numberToReal()');
    var numero = numero.toFixed(2).split('.');
    numero[0] =  numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

  backSpace(): void{
    console.log('-----> backSpace()');
    if(this.valor > 9){
      let string = ''+ this.valor;    
      this.valor = parseInt(string.substr(0,(string.length - 1)));
    }else if(this.valor > 0){
      this.valor = 0;
    }
    this.visor = this.numberToReal(this.valor/100);
  }

  insereValor(): void{    
    this.valor = this.valor/100;
    console.log('-----> insereValor() ',this.valor );
  }

  dismiss() {        
    this.valor = this.valor/100;

    let data = { 'valor': this.valor };
    console.log('-----> dismissValor() ',data.valor);
    this.viewCtrl.dismiss(data);    
  }

  popPage(){
    this.navCtrl.pop();
  }

}
