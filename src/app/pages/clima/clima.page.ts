import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  climas = [];

  constructor(
    private http: HttpClient) { }


  ngOnInit() {

    console.log("Hola")
    this.getClima().subscribe(res => {
      console.log("Respuesta", res)
      this.climas = res;

    })
  }


  getClima() {
    return this.http
      .get("./assets/json/clima.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }

}
