import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api = "cliente/";

  constructor(private httpClient: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }

  existe(id: number){
   return this.httpClient.get(this.baseUrl+this.api+id);
  }

  crear(cliente: Cliente){
    return this.httpClient.post(this.baseUrl+this.api,cliente);
  }

}
