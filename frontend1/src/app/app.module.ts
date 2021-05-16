import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{HttpClientModule} from '@angular/common/http'
import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearReservaComponent } from './reserva/components/crear-reserva/crear-reserva.component';
import { CrearClienteComponent } from './reserva/components/crear-cliente/crear-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CrearReservaComponent,
    CrearClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: "BASE_API_URL", useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
  entryComponents: [CrearClienteComponent]
})
export class AppModule { }
