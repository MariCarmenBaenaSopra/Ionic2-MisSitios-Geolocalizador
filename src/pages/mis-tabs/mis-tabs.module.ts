import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisTabs } from './mis-tabs';

@NgModule({
  declarations: [
    MisTabs,
  ],
  imports: [
    IonicPageModule.forChild(MisTabs),
  ]
})
export class MisTabsModule {}
