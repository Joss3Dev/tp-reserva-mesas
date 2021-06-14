import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../model/restaurante';
import { RestauranteService } from '../reserva/services/restaurante.service';
import { MesaService } from '../reserva/services/mesa.service';
import { CategoriaService } from '../service-consumo/categoria.service';
import { ProductoService } from '../service-consumo/producto.service';
import { Mesa } from '../model/mesa';
import { Categoria } from '../model/categoria';
import { Producto } from '../model/producto';
import { DetalleTabla } from '../model/detalle-tabla';
import { Consumo } from '../model/consumo';
import { Detalle } from '../model/detalle';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ConsumoService } from '../service-consumo/consumo.service';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  formDetalleConsumo: FormGroup;
  listRestaurante : Restaurante[];
  listMesa : Mesa[]; 
  listCategoria : Categoria[];
  listaProducto: Producto[];
  disabled: Boolean = true;
  mesaOcupada : boolean = false;
  mesaNoOcupada: boolean = false;
  id_mesa : number;
  listaDetalle: DetalleTabla[] = [];
  isMessage: boolean = false;
  message: string;

  constructor( 
    private restauranteService: RestauranteService, 
    private mesaService: MesaService, 
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private productoService : ProductoService,
    private consumoService : ConsumoService
  ) { }

  ngOnInit() {
    this.inicializarForm();

    this.restauranteService.getRestaurente().subscribe(data => {
      this.listRestaurante = data;
    });

    this.categoriaService.getCategorias().subscribe(data => {
      this.listCategoria = data;
    });
  }

  private inicializarForm(): void {
    this.formDetalleConsumo = this.formBuilder.group({
      id_categoria: new FormControl('', Validators.required),
      id_producto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required)
    });
  }

  obtenerMesas(e: Event) {
    if ( this.disabled ) {
      this.disabled = false;
    }
    let id_restaurante: number = parseInt((e.target as HTMLInputElement).value);
    this.mesaService.getMesa(id_restaurante).subscribe(data => {
      this.listMesa = data;
    });
  }

  verificarConsumo(event: Event) {
    this.id_mesa = parseInt((event.target as HTMLInputElement).value);
    this.consumoService.obtenerConsumo(this.id_mesa).subscribe(data => {
      console.log(data);
      let json : any = data;
      this.mesaOcupada = json.data ? true : false;
      this.mesaNoOcupada = !this.mesaOcupada; 
    });
  }

  onSubmit() {
    let detalleForm  = this.formDetalleConsumo.value;
    this.inicializarForm();

    let prod : Producto[] = this.listaProducto.filter(p => p.id == detalleForm.id_producto); 
    const detalle : DetalleTabla = new DetalleTabla();
    detalle.id = prod[0].id;
    detalle.nombre = prod[0].nombre;
    detalle.cantidad = detalleForm.cantidad;
    detalle.precio = prod[0].precio;
    detalle.subtotal = detalle.cantidad * detalle.precio;

    if ( this.listaDetalle.length > 0 ) {
      let flag = false;
      for(let d of this.listaDetalle) {
        if ( d.nombre == detalle.nombre){
          d.cantidad = d.cantidad + detalle.cantidad;
          d.subtotal = d.cantidad * d.precio;
          flag = true;
          break;
        }
      }
      if ( flag == false){
        this.listaDetalle.push(detalle);
      }
    }
    else {
      this.listaDetalle.push(detalle);
    }
  }

  obtenerProductos(e: Event) {
    let id : number = parseInt((e.target as HTMLInputElement).value);
    this.productoService.getProductosPorIdCategoria(id).subscribe(data => {
      this.listaProducto = data;
    });
  }

  guardarConsumo() {
    let consumo : Consumo = new Consumo();
    consumo.fecha_cierre = null;
    //Cambiar el id cuando elige un cliente;
    consumo.id_cliente = 2;
    consumo.id_mesa = this.id_mesa;
    consumo.is_open = true;
    consumo.total = 0;
    consumo.detalles = [];
    for ( let dt of this.listaDetalle ) {
      let detalle : Detalle = new Detalle();
      detalle.id_producto = dt.id;
      detalle.cantidad = dt.cantidad;
      detalle.subtotal = dt.subtotal;
      consumo.total = consumo.total + detalle.subtotal;
      consumo.detalles.push(detalle);
    }

    this.consumoService.agregarConsumo(consumo).subscribe(data => {
      let json : any = data;
      this.isMessage = true;
      this.message = json.mensaje;
      this.listaDetalle = [];
    });
  }

}
