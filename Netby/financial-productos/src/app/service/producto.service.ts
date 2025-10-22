import { Injectable } from '@angular/core';
import { IProducto } from '../models/IProducto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl: string = '';
  partUrl: string = '';
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
    this.partUrl = '/Producto';
  }

  listarProductos(): Observable<IProducto[]>{
    return this.http.get<IResponse<IProducto[]>>(this.apiUrl + this.partUrl + '/ObtenerProductos').pipe(
      map((respuesta: any) => {
        respuesta.data.forEach((element: IProducto) => {
          element.imagen = 'assets/' + element.imagen;
        });
        return respuesta.data;
      })
    );
  }

  listarProductoPorId(id: number): Observable<IProducto[]>{
    return this.http.get<IResponse<IProducto>>(this.apiUrl + this.partUrl + '/ObtenerProductoId/' + id).pipe(
      map((respuesta: any) => {
        respuesta.data.forEach((element: IProducto) => {
          element.imagen = 'assets/' + element.imagen;
        });
        return respuesta.data;
      })
    );
  }

 verificarId(id: string): Observable<boolean>{
   return this.http.get<IResponse<IProducto>>(this.apiUrl + this.partUrl + '/ObtenerProductoId/' + id).pipe(
      map((respuesta: any) => {
        return respuesta.data.length > 0 ? true : false;
      })
    );
  }

  crearProducto(producto: IProducto): Observable<IResponse<number>>{
    return this.http.post<IResponse<number>>(this.apiUrl + this.partUrl + '/GuardarProducto', producto).pipe(
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

  actualizarProducto(producto: IProducto): Observable<IResponse<number>>{
    return this.http.put<IResponse<number>>(this.apiUrl + this.partUrl + '/ActualizarProducto/' + producto.id, producto).pipe(
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

  eliminarProducto(id: number): Observable<IResponse<number>>{
    return this.http.delete<IResponse<number>>(this.apiUrl + this.partUrl + '/EliminarProducto/' + id).pipe(
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
