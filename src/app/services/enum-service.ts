import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  http: HttpClient = inject(HttpClient);
  base_url: string = "api/enums";

  /* Realmente no le encontré la vuelta de cómo manejar el enum al momento de enviar
  el objeto al back, no hubo chance. Lo dejo para que lo usen y prueben.
  */

  // getProductStatusEnums(): Observable<ProductStatus[]> {
  //   return this.http.get<ProductStatus[]>(`${this.base_url}/state`);
  // }
  //
  // getRoleEnums(): Observable<Role[]> {
  //   return this.http.get<Product[]>(`${this.base_url}/role`);
  // }
  //
  // getUserStatusEnums(): Observable<UserStatus[]> {
  //   return this.http.get<Product[]>(`${this.base_url}/user-state`);
  // }
}
