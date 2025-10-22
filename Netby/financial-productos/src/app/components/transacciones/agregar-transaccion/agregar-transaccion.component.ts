import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { IProducto } from 'src/app/models/IProducto';
import { ITransaccion } from 'src/app/models/ITransaccion';
import { ProductoService } from 'src/app/service/producto.service';
import { TransaccionService } from 'src/app/service/transaccion.service';

@Component({
  selector: 'app-agregar-transaccion',
  templateUrl: './agregar-transaccion.component.html',
  styleUrls: ['./agregar-transaccion.component.scss']
})
export class AgregarTransaccionComponent implements OnInit {
  transaccionForm!: FormGroup;
  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];
  productoActual: IProducto = {} as IProducto;
  showModal = false;
  modal: HTMLElement | null = null;
  openBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  inputRequeridos: string = 'Este campo es requerido!';
  isDisabled: boolean = true;
  transaccion: ITransaccion = {} as ITransaccion;
  timezoneOffset: any;
  esEditar: boolean = false;
  existeId: boolean = false;

  @Output() formSubmitted = new EventEmitter<any>();
  @ViewChild('id') id!: HTMLInputElement;
  
  constructor(private productoService: ProductoService, 
    private formBuilder: FormBuilder, 
    private transaccionService: TransaccionService) { }

  ngOnInit(): void {
    this.iniciar();
  }

  iniciar(){
    this.transaccionForm = this.formBuilder.group({
      id: ['', Validators.required],
      idProducto: ['', null],
      nombreProducto: ['', null],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      precioTotal: ['', Validators.required],
      detalle: ['', Validators.required],
      fecha: ['', Validators.required],
      tipoTransaccion: ['', Validators.required]
    });
  }

  public openModal(productos: IProducto[]) {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.esEditar = false;
    this.productos = productos;
    this.productosFiltrados = productos;
    this.resetForm();
  }

  resetForm() {
    this.transaccionForm.reset();
  }

  seleccionarProducto(producto: IProducto) {
    this.productoActual = producto;
    this.transaccionForm.get('idProducto')?.setValue(producto.id);
    this.transaccionForm.get('nombreProducto')?.setValue(producto.nombre);
    this.isDisabled = false;
  }
  

  public openModalEditar(item: ITransaccion) {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.transaccionForm.get('id')?.setValue(item.id);
    this.transaccionForm.get('idProducto')?.setValue(item.idProducto);
    this.transaccionForm.get('cantidad')?.setValue(item.cantidad);
    this.transaccionForm.get('precioUnitario')?.setValue(item.precioUnitario);
    this.transaccionForm.get('precioTotal')?.setValue(item.cantidad * item.precioUnitario);
    this.transaccionForm.get('detalle')?.setValue(item.detalle);
    this.transaccionForm.get('fecha')?.setValue(item.fecha);
    this.transaccionForm.get('tipoTransaccion')?.setValue(item.tipoTransaccion);
    this.transaccionForm.setErrors(null);
    this.transaccionForm.updateValueAndValidity();
    this.verificarErrores();
    this.isDisabled = false;
    this.esEditar = true;
  }

  isControlValid(controlName: string): boolean | null | undefined {
    const control = this.transaccionForm.get(controlName);
    return control?.valid && control?.dirty &&  control.touched;
  }

  onSubmit() {
    this.verificarId().then((existeId) => {
      if (existeId && !this.esEditar) {
        return;
      }
      else
      {
        this.existeId = false;
        if (this.transaccionForm.valid) {
          console.log('Formulario válido:', this.transaccionForm.value);
          this.transaccion.id = this.transaccionForm.get('id')?.value;
          this.transaccion.idProducto = this.transaccionForm.get('idProducto')?.value;
          this.transaccion.cantidad = this.transaccionForm.get('cantidad')?.value;
          this.transaccion.precioUnitario = this.transaccionForm.get('precioUnitario')?.value;
          this.transaccion.precioTotal = this.transaccionForm.get('precioTotal')?.value;
          this.transaccion.detalle = this.transaccionForm.get('detalle')?.value;
          this.transaccion.fecha = this.transaccionForm.get('fecha')?.value;
          this.transaccion.tipoTransaccion = this.transaccionForm.get('tipoTransaccion')?.value;
          this.closeModal();
          this.formSubmitted.emit({producto: this.transaccion, accion: this.esEditar ? 'editar' : 'crear'});
        } else {
          console.log('Formulario inválido');
        }
      }
    });
  }

  async verificarId(){
    this.existeId = await lastValueFrom(this.transaccionService.verificarId(this.transaccionForm.get('id')?.value));
    return this.existeId;
  }

  public closeModal() {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "none";
    this.showModal = false;
  }

  verificarErrores() {
    const errores = [];
    const controls = this.transaccionForm.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid && controls[controlName].errors) {
        const errors = controls[controlName].errors;
        for (const errorKey in errors) {
          if (errorKey === 'required') {
            errores.push(`${controlName} es requerido.`);
          } else if (errorKey === 'minlength') {
            errores.push(`${controlName} necesita al menos ${errors[errorKey].requiredLength} caracteres.`);
          }
        }
      }
    }

    console.log(errores);
    return errores;
  }

  CalcularPrecioTotal() {
    this.transaccionForm.get('precioTotal')?.setValue(this.transaccionForm.get('cantidad')?.value * this.transaccionForm.get('precioUnitario')?.value);
  }

  onSearchProducto(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.productosFiltrados = this.productos.filter(producto => producto.nombre.toLowerCase().includes(query.toLowerCase()));
  }

}
