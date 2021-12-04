///import componentes
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Computador, } from './computador';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  computadorList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(

    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter

  ) {

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'computadores_db.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.storage = db;
        this.getFakeData();
      });
    });
  }

  //Estado de la db
  dbState() {
    return this.isDbReady.asObservable();
  }

  ///Carga los datos y propiedades observable 
  fetchComputadores(): Observable<Computador[]> {
    return this.computadorList.asObservable();
  }

  getFakeData() {
    this.httpClient.get(
      'assets/script.sql', { responseType: 'text' })
      .subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getComputadores();
            this.isDbReady.next(true);
          })

      });
  }


  ///Obtener lista de computadores
  getComputadores() {
    return this.storage.executeSql('SELECT * FROM computador', [])
      .then(res => {
        let items: Computador[] = [];
        if (res.rows.legth > 0) {
          for (var i = 0; i < res.rows.legth; i++) {
            items.push({
              id: res.rows.items(i).id,
              marca: res.rows.items(i).marca,
              modelo: res.rows.items(i).modelo,
              procesador: res.rows.items(i).procesador,
              ram: res.rows.items(i).ram,
              disco: res.rows.items(i).disco,
              peso: res.rows.items(i).peso,
              pantalla: res.rows.items(i).pantalla,
              bateria: res.rows.items(i).bateria,
              precio: res.rows.items(i).precio

            });
          }
        }
        this.computadorList.next(items);
      })
  }


  ///Metodo Agregar computador

  addComputador(marca, modelo, procesador, ram, disco, peso, pantalla, bateria, precio) {
    let data = [marca, modelo, procesador, ram, disco, peso, pantalla, bateria, precio]
    return this.storage.executeSql('INSERT INTO computador (marca, modelo, procesador, ram, disco, peso, pantalla, bateria, precio) VALUES (?,?,?,?,?,?,?,?,?)', data)
      .then(res => {
        this.getComputadores();
      });
  }

  //Metodo actualzar
  updateComputador(id, computador: Computador) {
    let data = [computador.marca, computador.modelo, computador.procesador, computador.ram, computador.disco, computador.peso, computador.pantalla, computador.bateria, computador.precio];
    return this.storage.executeSql('UPDATE computador SET marca = ?, modelo = ?, procesador = ?, ram = ?, disco = ?, peso = ?, pantalla = ?, bateria = ?, precio = ? WHERE id = ${id}')
      .then(res => {
        this.getComputadores();
      })
  }

  //Buscar 1 solo computador

  getComputador(id: Promise<Computador>) {
    let data = [id];
    return this.storage.executeSql('SELECT * FROM computador WHERE id = ?', data)
      .then(res => {
        return {
          id: res.rows.item(0).id,
          marca: res.rows.item(0).marca,
          modelo: res.rows.item(0).modelo,
          procesador: res.rows.item(0).procesador,
          ram: res.rows.item(0).ram,
          disco: res.rows.item(0).disco,
          peso: res.rows.item(0).peso,
          pantalla: res.rows.item(0).pantalla,
          bateria: res.rows.item(0).bateria,
          precio: res.rows.item(0).precio

        }
      });


  }


  deleteComputador(id) {
    let data = [id];
    return this.storage.executeSql('SELECT * FROM computador WHERE id = ? ', data)
      .then(_ => {
        this.getComputadores();
      });
  }


}
