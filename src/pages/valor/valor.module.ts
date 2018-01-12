import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValorPage } from './valor';

@NgModule({
  declarations: [
    ValorPage,
  ],
  imports: [
    IonicPageModule.forChild(ValorPage),
  ],
})
export class ValorPageModule {}
