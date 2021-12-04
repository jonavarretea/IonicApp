import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputadorPageRoutingModule } from './computador-routing.module';

import { ComputadorPage } from './computador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComputadorPageRoutingModule
  ],
  declarations: [ComputadorPage]
})
export class ComputadorPageModule {}
