import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormComputadorPageRoutingModule } from './form-computador-routing.module';

import { FormComputadorPage } from './form-computador.page';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormComputadorPageRoutingModule,
    ////Modulo de los componentes
    ReactiveFormsModule
  ],
  declarations: [FormComputadorPage]
})
export class FormComputadorPageModule { }
