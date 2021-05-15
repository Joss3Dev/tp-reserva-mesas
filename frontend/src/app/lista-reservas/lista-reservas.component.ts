import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../shared/models/cliente';
import { Restaurante } from '../shared/models/restaurante';
import { ReservaService } from '../shared/services/reserva.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  reserva = {id: 1, nombre: "Reserva de mesa 3"}
  
  reservas = [
    { 
      id: 1,
      restaurante: 2,
      mesa: 15,
      fecha: '01/05/2021',
      hora: '13:00 - 14:00',
      cliente: 3,
      cantidad_sillas: 4
    },
    { 
      id: 2,
      restaurante: 1,
      mesa: 4,
      fecha: '01/05/2021',
      hora: '14:00 - 15:00',
      cliente: 8,
      cantidad_sillas: 2
    },
    { 
      id: 3,
      restaurante: 2,
      mesa: 15,
      fecha: '01/05/2021',
      hora: '21:00 - 22:00',
      cliente: 1,
      cantidad_sillas: 2
    },
    { 
      id: 4,
      restaurante: 1,
      mesa: 15,
      fecha: '01/05/2021',
      hora: '20:00 - 21:00',
      cliente: 5,
      cantidad_sillas: 8
    },
  ]

  public restaurante: Restaurante;
  public fecha: string;
  public cliente: Cliente;

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) { }


  ngOnInit(): void {
    // this.getReservas()
  }

  // getReservas(){
  //   this.reservaService.getReservas(this.restaurante, this.fecha, this.cliente).subscribe(
  //     data =>{
  //       // PONER ACA LO QUE VA A RECIBIR LA LISTA DE RESERVAS Y COMO GESTINONAR PARA
  //       // QUE SE PUEDA LLEVAR AL HTML
  //     }
  //   )
  // }

}
