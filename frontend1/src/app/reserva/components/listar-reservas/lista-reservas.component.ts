import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { Cliente } from '../../../model/cliente';
import { Restaurante } from '../../../model/restaurante';
import { MesaService } from '../../services/mesa.service';
import { ReservaService } from '../../services/reserva.service';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  public restaurante: Restaurante;
  public idRestaurante: number;
  public fecha: string;
  public cliente: Cliente;
  public listaReservas: Reserva[];

  constructor(
    private reservaService: ReservaService,
    private restauranteService: RestauranteService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.idRestaurante = params.idRestaurante;
      this.restauranteService.getRestaurenteId(this.idRestaurante).subscribe(data =>{
        this.restaurante = data;
        this.fecha = params.fecha;
        this.getReservas(this.idRestaurante, this.fecha)
      });
    }); 
  }

  getReservas(idRestaurante, fecha){
    this.reservaService.getReservas(idRestaurante, fecha).subscribe(
      data =>{
        this.listaReservas = data        
      }
    )
  }

}
