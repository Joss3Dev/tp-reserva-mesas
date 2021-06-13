import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/model/cliente';
import { Mesa } from 'src/app/model/mesa';
import { Reserva } from 'src/app/model/reserva';
import { Restaurante } from 'src/app/model/restaurante';
import { ClienteService } from '../../services/cliente.service';
import { MesaService } from '../../services/mesa.service';
import { ReservaService } from '../../services/reserva.service';
import { RestauranteService } from '../../services/restaurante.service';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  lista: Restaurante[];
  activado = "static-1";
  horarios: string[]=[];
  reserva: Reserva=new Reserva();
  horaMax=1;
  cedula: number;
  mesas: Mesa[];
  cliente: Cliente= new Cliente();
  activar=false;
  clienteError = false;
  reservaError =  false;
  creadoConExito=false;
  today=new Date().toISOString().slice(0, 10);

  constructor(private modalService: NgbModal, private restauranteService: RestauranteService, private mesaService: MesaService, private reservaService: ReservaService, private clienteService: ClienteService,private router: Router ) {}

  open() {

    if(!this.cliente.cedula) return;
    this.clienteService.existe(this.cliente.cedula).subscribe(res=>{
      if(!res["data"]){
        this.cliente.nombre=""
        this.cliente.apellido=""
        const modalRef = this.modalService.open(CrearClienteComponent,{backdrop: 'static'});
        let aux = new Cliente();
        aux.cedula=this.cliente.cedula;
        aux.nombre=this.cliente.nombre;
        aux.apellido=this.cliente.apellido;
        modalRef.componentInstance.cliente = aux;
        modalRef.result.then(val => {
          if(val)this.cliente=val

        })
      }
      else{
        this.cliente=res["data"];

      }

    })

  }

  guardar(){
    this.reservaError=false;
    this.clienteError=false;
    if(!this.cliente.id){
      //crear primero cliente
      if(!(this.cliente.nombre&&this.cliente.apellido&&this.cliente.cedula)) return;
      if(!(this.reserva.id_mesa&&this.reserva.id_restaurante&&this.reserva.rango_hora&&this.reserva.fecha&&this.reserva.cantidad_solicitada)) return;
      this.clienteService.crear(this.cliente).subscribe((res)=>{
        this.reserva.id_cliente=res["dato"].id
        this.reservaService.crearReserva(this.reserva).subscribe(res1=>{
          this.creadoConExito=true;
          console.log("Creado con exito");
          setTimeout(() =>
{
    this.router.navigateByUrl("/listar-reserva");
},
3000);
        },err=>this.reservaError=true)
      },err=>this.clienteError=true)

    }
    else{
      this.reserva.id_cliente = this.cliente.id;
      if(!(this.reserva.id_mesa&&this.reserva.id_restaurante&&this.reserva.rango_hora&&this.reserva.fecha&&this.reserva.cantidad_solicitada)) return;
      this.reservaService.crearReserva(this.reserva).subscribe(res=>{
        console.log("Creado con exito")
        this.creadoConExito=true;
        setTimeout(() =>
{
    this.router.navigateByUrl("/listar-reserva");
},
3000);
      },err=>this.reservaError=true)
    }
  }

  buscarMesasDisponibles(){
    if(!(this.reserva.id_restaurante&&this.reserva.rango_hora&&this.reserva.fecha)) return;
    this.mesaService.getMesa(this.reserva.id_restaurante).subscribe(res=>{
      this.mesas=res
      this.reservaService.getReservas(this.reserva.id_restaurante, this.reserva.fecha).subscribe(reservas=>{
        let ocupados = []
        reservas.forEach(res=>{
          let rango = res.rango_hora.split(' ')
          let min = rango[0];
          let max = rango[2];
          rango = this.reserva.rango_hora.split(' ')
          let min1 = rango[0];
          let max1 = rango[2];
          if(min>=min1 && min<max1){
            ocupados.push(res.id_mesa)
            return;
          }
          if(max>min1 && max<=max1){
            ocupados.push(res.id_mesa)
            return;
          }

        })
        this.mesas = this.mesas.filter(mesa=>!ocupados.some(x=>x===mesa.id));
        this.activar = this.mesas.length===0;
      })
    });

    this.activado = "static-3";
  }



  ngOnInit(){
    this.buildRango()
    this.restauranteService.getRestaurente().subscribe(res=>this.lista=res);
    this.mesas = []
  }

  buildRango(){
    this.horarios = [];
    [[12,15],[19,23]].forEach(rango=>{
      let p = rango[0];
      let u = rango[1];
      for(let j=p;j<u;j++){
        if(j+this.horaMax<=u){
          this.horarios.push(`${j} a ${j+this.horaMax}`)
        }
        }
    })
  }

}


