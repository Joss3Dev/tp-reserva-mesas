import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  @Input("cedula") cliente: Cliente;
  constructor(private clienteService: ClienteService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  guardar(){
    if(!(this.cliente.cedula&&this.cliente.nombre&&this.cliente.apellido)) return;
    this.activeModal.close(this.cliente)
  }

}