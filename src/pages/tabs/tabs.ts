
import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { ContasPage } from './../contas/contas';
import { ContactPage } from './../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContasPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
