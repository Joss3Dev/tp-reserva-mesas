import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component'

const routes: Routes = [
  {
    path: 'lista-reservas',
    component: ListaReservasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
