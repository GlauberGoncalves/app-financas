import { StorageProvider } from './../../providers/storage/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, List, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  @ViewChild(List) list: List;

  /* teste com lista de itens  */
  public itens = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storageProvider: StorageProvider) { 
      
      this.getCategorias();

     }


    /* seleciona a categoria escolhida pelo usuario */

    public selecionarCategoria(item, slidingItem: ItemSliding):void{
      console.log('-----> selecionarCategoria() ', item);
      this.viewCtrl.dismiss(item);
    }

    public getCategorias(){
      this.itens = this.storageProvider.getCategorias();
      console.log(this.itens);
    }

    // public delete(id){
    //   this.storageProvider.deleteCategoria(id);
    // }
    

}


