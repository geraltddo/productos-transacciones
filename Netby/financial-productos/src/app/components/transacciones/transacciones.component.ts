import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ITransaccion } from 'src/app/models/ITransaccion';
import { ToastComponent } from '../utilitarios/toast/toast.component';
import { ProductoService } from 'src/app/service/producto.service';
import { TransaccionService } from 'src/app/service/transaccion.service';
import { lastValueFrom } from 'rxjs';
import { AgregarTransaccionComponent } from './agregar-transaccion/agregar-transaccion.component';
import { IProducto } from 'src/app/models/IProducto';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit, AfterViewInit {

  transacciones: ITransaccion[] | null = [];
  transaccionesFiltrados: ITransaccion[] | null = [];
  transaccionEliminar: ITransaccion = {} as ITransaccion;
  transaccionActual: ITransaccion = {} as ITransaccion;
  productos: IProducto[] | null = [];
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('modal') modal!: AgregarTransaccionComponent;
  searchTerm: string = '';
  showModal = false;
  modalEliminar: HTMLElement | null = null;
  openBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  
  constructor(private productoService: ProductoService, private transaccionService: TransaccionService) { }
  ngAfterViewInit(): void {
    this.iniciar();
  }

  ngOnInit(): void {
    
  }

  openModalAgregarTransaccion() {
    this.modal.openModal(this.productos!);
  }

  eliminarTransaccion(item: ITransaccion) {
    this.productoService.eliminarProducto(item.id).subscribe({
      next: (respuesta: any) => {
        if (respuesta.error) {
          this.toast.showToast(respuesta.message);
          return;
        }
        else {
          this.transacciones = this.transacciones!.filter(transaccion => transaccion.id != item.id);
          this.transaccionesFiltrados = this.transaccionesFiltrados!.filter(transaccion => transaccion.id != item.id);
          this.toast.showToast('Producto eliminado correctamente!');
          this.iniciar();
        }
      }
    });
    this.closeModal();
  }

  openModal(item: ITransaccion) {
      this.transaccionEliminar = item;
      this.modalEliminar = document.getElementById("modalEliminar");
      this.modalEliminar!.style.display = "flex";
      this.showModal = true;
    }

  closeModal() {
    this.modalEliminar = document.getElementById("modalEliminar");
    this.modalEliminar!.style.display = "none";
    this.showModal = false;
  }

  iniciar(){
    console.log('iniciando');
    this.transaccionService.listarTransacciones().subscribe(
      (transacciones: ITransaccion[]) => {
        this.transacciones = transacciones;
        this.transaccionesFiltrados = Object.assign([], this.transacciones);``
        if (this.transacciones!.length == 0) 
          this.toast.showToast('No se encontraron transacciones!');
        else
          this.toast.showToast('Transacciones cargados correctamente!');
      }
    );

    this.productoService.listarProductos().subscribe(
      (productos: IProducto[]) => {
        this.productos = productos;
      }
    );
  }

  filtrarProductos($event: any) {
    const numeroRegistros = $event.target.value;
    if (numeroRegistros == 0) {
      this.transaccionesFiltrados = this.transacciones;
      return;
    }
    this.transaccionesFiltrados = this.transacciones!.slice(0, numeroRegistros);
  }

  obtenerProductoPorId(id: number) {
   const respuesta = this.productos!.filter(producto => producto.id == id);
   return respuesta[0].nombre;
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.transacciones!.length > 0) {
      this.transaccionesFiltrados = this.transacciones!.filter(transaccion => transaccion.detalle.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  guardarTransaccion(transaccion: ITransaccion, accion: string){
      if (accion == 'editar') {
        this.transaccionService.actualizarTransaccion(transaccion).subscribe({
          next: (respuesta: any) => {
            if (respuesta.error) {
              this.toast.showToast(respuesta.message);
              return;
            }
            else if (respuesta.data) {
              this.transacciones = this.transacciones!.map(transaccion => transaccion.id == respuesta.data.id ? respuesta.data : transaccion);
              this.transaccionesFiltrados = this.transaccionesFiltrados!.map(transaccion => transaccion.id == respuesta.data.id ? respuesta.data : transaccion);
              this.toast.showToast('Producto actualizado correctamente!');
              this.iniciar();
            }
          }
        })
      }
      else if (accion == 'crear') {
        this.transaccionService.crearTransaccion(transaccion).subscribe({
        next: (respuesta: any) => {
          if (respuesta.error) {
            this.toast.showToast(respuesta.message);
            return;
          }
          else if (respuesta.data) {
            this.transacciones!.push(respuesta.data);
            this.transaccionesFiltrados!.push(respuesta.data);
            this.toast.showToast('Producto creado correctamente!');
            this.iniciar();
          }
        }
      });
      }
  
      
    }

}
