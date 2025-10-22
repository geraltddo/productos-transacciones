import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITransaccion } from '../models/ITransaccion';
import { catchError, map, Observable, of } from 'rxjs';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  apiUrl: string = '';
  partUrl: string = '';
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
    this.partUrl = '/Transaccion';
  }

  listarTransacciones(): Observable<ITransaccion[]>{
    return this.http.get<IResponse<ITransaccion[]>>(this.apiUrl + this.partUrl + '/ObtenerTransacciones').pipe(
      map((respuesta: any) => {
        return respuesta.data;
      })
    );
  }
  
  listarTransaccionPorId(id: number): Observable<ITransaccion[]>{
    return this.http.get<IResponse<ITransaccion>>(this.apiUrl + this.partUrl + '/ObtenerTransaccionesId/' + id).pipe(
      map((respuesta: any) => {
        return respuesta.data;
      })
    );
  }

  verificarId(id: string): Observable<boolean>{
     return this.http.get<IResponse<ITransaccion>>(this.apiUrl + this.partUrl + '/ObtenerTransaccionId/' + id).pipe(
        map((respuesta: any) => {
          return respuesta.data.length > 0 ? true : false;
        })
      );
    }
  
  crearTransaccion(transaccion: ITransaccion): Observable<IResponse<number>>{
    return this.http.post<IResponse<number>>(this.apiUrl + this.partUrl + '/GuardarTransaccion', transaccion).pipe(
      catchError(err => {
        const errorRespuesta = {
          success: false,
          error: true,
          message: err.message,
          data: null
        };
        return of(errorRespuesta);
      })
    );
  }
  
  actualizarTransaccion(transaccion: ITransaccion): Observable<IResponse<number>>{
    return this.http.put<IResponse<number>>(this.apiUrl + this.partUrl + '/ActualizarTransaccion/' + transaccion.id, transaccion).pipe(
      catchError(err => {
        const errorRespuesta = {
          success: false,
          error: true,
          message: err.message,
          data: null
        };
        return of(errorRespuesta);
      })
    );
  }
  
  eliminarTransaccion(id: number): Observable<IResponse<number>>{
    return this.http.delete<IResponse<number>>(this.apiUrl + this.partUrl + '/EliminarTransaccion/' + id).pipe(
      catchError(err => {
        const errorRespuesta = {
          success: false,
          error: true,
          message: err.message,
          data: null
        };
        return of(errorRespuesta);
      })
    );
  }
}
