import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearReservaComponent } from './reserva/components/crear-reserva/crear-reserva.component';


const routes: Routes = [
  { path: 'crear-reserva', component: CrearReservaComponent },
  { path: 'listar-reserva', component: CrearReservaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
