import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IProducto } from 'src/app/models/IProducto';
import { ToastComponent } from '../utilitarios/toast/toast.component';
import { ProductoService } from 'src/app/service/producto.service';
import { AgregarProductoComponent } from './modals/agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-producto-financiero',
  templateUrl: './producto-financiero.component.html',
  styleUrls: ['./producto-financiero.component.scss']
})
export class ProductoFinancieroComponent implements OnInit, AfterViewInit {

  productos: IProducto[] | null = [];
  productosFiltrados: IProducto[] | null = [];
  productoEliminar: IProducto = {} as IProducto;
  productoActual: IProducto = {} as IProducto;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('modal') modal!: AgregarProductoComponent;
  searchTerm: string = '';
  showModal = false;
  modalEliminar: HTMLElement | null = null;
  openBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.productos!.length > 0) {
      this.productosFiltrados = this.productos!.filter(producto => producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    
  }

  cargaProductoActual(item: IProducto){
    this.productoActual = item;
  }

  toggleDisplay(elem: any){
    const curDisplayStyle = elem.style.display;

    if (curDisplayStyle === 'none' || curDisplayStyle === ''){
      elem.style.display = 'block';
    }
    else{
      elem.style.display = 'none';
    }
  }

  toggleMenuDisplay(e: any){
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.menu-'+ this.productoActual.id);
    const icon = dropdown.querySelector('.dropdown .title-' + this.productoActual.id + ' .fa');

    toggleClass(menu,'hide');
    toggleClass(icon,'rotate-90');
  }

  handleOptionSelected(e: any){
    toggleClass(e.target.parentNode, 'hide');			

    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem = document.querySelector('.dropdown .title-' + this.productoActual.id);
    const icon = document.querySelector('.dropdown .title-' + this.productoActual.id +' .fa');

    titleElem!.textContent = newValue;
    titleElem!.appendChild(icon!);

    //document.querySelector('.dropdown .title')?.dispatchEvent(new Event('change'));
    setTimeout(() => toggleClass(icon,'rotate-90'), 0);
  }

  ngAfterViewInit(): void {
    this.iniciar();
  }

  iniciar(){
    console.log('iniciando');
    this.productoService.listarProductos().subscribe(
      (productos: IProducto[]) => {
        this.productos = productos;
        this.productosFiltrados = Object.assign([], this.productos);
        this.refreshItems();
        if (this.productos!.length == 0) 
          this.toast.showToast('No se encontraron productos!');
        else
          this.toast.showToast('Productos cargados correctamente!');
      }
    );
  }

  refreshItems(){
    setTimeout(() => {
      const dropdownTitle = document.querySelectorAll('.dropdown .title');
      const dropdownOptions = document.querySelectorAll('.dropdown .option');
      dropdownTitle.forEach(title => title?.addEventListener('click', this.toggleMenuDisplay.bind(this)));
      dropdownOptions.forEach(option => option.addEventListener('click', this.handleOptionSelected.bind(this)));
    }, 100);
  }

  openModalAgregarProducto(){
    this.modal.openModal();
  }

  guardarProducto(producto: IProducto, accion: string){
    if (accion == 'editar') {
      this.productoService.actualizarProducto(producto).subscribe({
        next: (respuesta: any) => {
          if (respuesta.error) {
            this.toast.showToast(respuesta.message);
            return;
          }
          else if (respuesta.data) {
            this.productos = this.productos!.map(producto => producto.id == respuesta.data.id ? respuesta.data : producto);
            this.productosFiltrados = this.productosFiltrados!.map(producto => producto.id == respuesta.data.id ? respuesta.data : producto);
            this.toast.showToast('Producto actualizado correctamente!');
            this.iniciar();
            this.refreshItems();
          }
        }
      })
    }
    else if (accion == 'crear') {
      this.productoService.crearProducto(producto).subscribe({
      next: (respuesta: any) => {
        if (respuesta.error) {
          this.toast.showToast(respuesta.message);
          return;
        }
        else if (respuesta.data) {
          this.productos!.push(respuesta.data);
          this.productosFiltrados!.push(respuesta.data);
          this.toast.showToast('Producto creado correctamente!');
          this.iniciar();
          this.refreshItems();
        }
      }
    });
    }

    
  }

  eliminarProducto(item: IProducto){
    this.productoService.eliminarProducto(item.id).subscribe({
      next: (respuesta: any) => {
        if (respuesta.error) {
          this.toast.showToast(respuesta.message);
          return;
        }
        else {
          this.productos = this.productos!.filter(producto => producto.id != item.id);
          this.productosFiltrados = this.productosFiltrados!.filter(producto => producto.id != item.id);
          this.toast.showToast('Producto eliminado correctamente!');
          this.iniciar();
          this.refreshItems();
        }
      }
    });
    this.closeModal();
  }

  openModal(item: IProducto) {
    this.productoEliminar = item;
    this.modalEliminar = document.getElementById("modalEliminar");
    this.modalEliminar!.style.display = "flex";
    this.showModal = true;
  }

  closeModal() {
    this.modalEliminar = document.getElementById("modalEliminar");
    this.modalEliminar!.style.display = "none";
    this.showModal = false;
  }

  filtrarProductos($event: any) {
    const numeroRegistros = $event.target.value;
    if (numeroRegistros == 0) {
      this.productosFiltrados = this.productos;
      return;
    }
    this.productosFiltrados = this.productos!.slice(0, numeroRegistros);

    this.refreshItems();
  }
}


function toggleClass(elem: any,className: any){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
  }

  return elem;
}