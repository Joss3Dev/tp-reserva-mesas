import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ListaReservas} from '../models/lista-reservas'

@Injectable({
    providedIn: 'root'
})
export class ReservaService{
    private basePath: string="/stock-pwfe/personaHorarioAgenda";

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    constructor(
        // private http: HttpClient,
      ) { }
    
    // getReservas(restaurante, fecha, cliente): Observable<ListaReservas>{
    //     return this.http.get<ListaReservas>(this.basePath,{params:{
    //         restaurante: restaurante,
    //         fecha: fecha,
    //         cliente: cliente,
    //         orderBy: 'fecha, hora, idMesa'
    //     }})
    // }
  
}