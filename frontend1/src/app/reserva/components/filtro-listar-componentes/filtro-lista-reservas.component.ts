import { DatePipe } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { Reserva } from 'src/app/model/reserva';
import { Cliente } from '../../../model/cliente';
import { Restaurante } from '../../../model/restaurante';
import { ReservaService } from '../../services/reserva.service';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-filtro-lista-reservas',
  templateUrl: './filtro-lista-reservas.component.html',
  styleUrls: ['./filtro-lista-reservas.component.css']
})
export class FiltroListaReservasComponent implements OnInit {

  public listaRestaurantes: Restaurante[];
  public filtrarReservaForm: FormGroup;

  constructor(
    private router: Router,
    private restauranteService: RestauranteService,
    private datepipe: DatePipe
  ) { 
    this.filtrarReservaForm = new FormGroup({
      idRestaurante: new FormControl(''),
      fecha: new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.restauranteService.getRestaurente().subscribe(
      data => {
        this.listaRestaurantes = data
      }
    )
  }

  onSubmit(): void{
    let restaurante = this.filtrarReservaForm.value.idRestaurante
    let fecha = this.filtrarReservaForm.value.fecha
    fecha = String(fecha.year)+"-"+String(fecha.month)+"-"+String(fecha.day)
    this.router.navigate(['/listar-reserva-filtrado/'],{queryParams: {idRestaurante: restaurante, fecha: fecha}})
  }

}
