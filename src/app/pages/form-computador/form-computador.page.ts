import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-form-computador',
  templateUrl: './form-computador.page.html',
  styleUrls: ['./form-computador.page.scss'],
})
export class FormComputadorPage implements OnInit {


  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    //Conect db 
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router

  ) { }

  //Cargamos los datos
  ngOnInit() {

    this.db.dbState().subscribe((res => {
      if (res) {
        this.db.fetchComputadores().subscribe(item => {
          this.Data = item
        })
      }
    }));
    this.mainForm = this.formBuilder.group({
      marca: [''],
      modelo: [''],
      procesador: [''],
      ram: [''],
      disco: [''],
      peso: [''],
      pantalla: [''],
      bateria: [''],
      precio: ['']
    })
  }

  capturarData() {
    this.db.addComputador(
      this.mainForm.value.marca,
      this.mainForm.value.modelo,
      this.mainForm.value.procesador,
      this.mainForm.value.ram,
      this.mainForm.value.disco,
      this.mainForm.value.peso,
      this.mainForm.value.pantalla,
      this.mainForm.value.bateria,
      this.mainForm.value.precio,
    ).then(res => {
      this.mainForm.reset()
    })

  }


  deleteComputador(id) {
    this.db.deleteComputador(id).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Computador agregado a la lista',
        duration: 4000
      });
      toast.present();
    })
  }

}
