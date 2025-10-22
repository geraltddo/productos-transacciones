import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, retry } from 'rxjs';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  showModal = false;
  modal: HTMLElement | null = null;
  openBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  inputRequeridos: string = 'Este campo es requerido!';
  isDisabled: boolean = true;
  producto: IProducto = {} as IProducto;
  timezoneOffset: any;
  fechaActual!: string;
  esEditar: boolean = false;
  existeId: boolean = false;

  @Output() formSubmitted = new EventEmitter<any>();
  @ViewChild('id') id!: HTMLInputElement;
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService
  ) {}
  
  public openModal() {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.esEditar = false;
    this.resetForm();
  }

  public openModalEditar(item: IProducto) {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.productoForm.get('id')?.setValue(item.id);
    this.productoForm.get('nombre')?.setValue(item.nombre);
    this.productoForm.get('descripcion')?.setValue(item.descripcion);
    this.productoForm.get('imagen')?.setValue(item.imagen);
    this.productoForm.get('categoria')?.setValue(item.categoria);
    this.productoForm.get('precio')?.setValue(item.precio);
    this.productoForm.get('stock')?.setValue(item.stock);
    this.productoForm.setErrors(null);
    this.productoForm.updateValueAndValidity();
    this.verificarErrores();
    this.isDisabled = false;
    this.esEditar = true;
  }

  // Método para verificar los errores de validación
  verificarErrores() {
    const errores = [];
    const controls = this.productoForm.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid && controls[controlName].errors) {
        const errors = controls[controlName].errors;
        for (const errorKey in errors) {
          // Aquí puedes crear mensajes de error personalizados para cada tipo de validación
          if (errorKey === 'required') {
            errores.push(`${controlName} es requerido.`);
          } else if (errorKey === 'minlength') {
            errores.push(`${controlName} necesita al menos ${errors[errorKey].requiredLength} caracteres.`);
          }
          // Agrega más casos para otros tipos de validación
        }
      }
    }

    console.log(errores);
    return errores;
  }

  public closeModal() {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "none";
    this.showModal = false;
  }

  isControlValid(controlName: string): boolean | null | undefined {
    const control = this.productoForm.get(controlName);
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
        if (this.productoForm.valid) {
          console.log('Formulario válido:', this.productoForm.value);
          this.producto.id = this.productoForm.get('id')?.value;
          this.producto.descripcion = this.productoForm.get('descripcion')?.value;
          this.producto.nombre = this.productoForm.get('nombre')?.value;
          this.producto.imagen = this.productoForm.get('imagen')?.value;
          this.producto.categoria = this.productoForm.get('categoria')?.value;
          this.producto.precio = this.productoForm.get('precio')?.value;
          this.producto.stock = this.productoForm.get('stock')?.value;
          this.closeModal();
          this.formSubmitted.emit({producto: this.producto, accion: this.esEditar ? 'editar' : 'crear'});
        } else {
          console.log('Formulario inválido');
        }
      }
    });

    
  }

  resetForm() {
    this.productoForm.reset();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.productoForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.timezoneOffset = new Date().getTimezoneOffset();
    this.fechaActual = new Date(new Date().getTime() - this.timezoneOffset * 60 * 1000).toISOString().split('T')[0];
  }

  async verificarId(){
    this.existeId = await lastValueFrom(this.productoService.verificarId(this.productoForm.get('id')?.value));

    return this.existeId;
  }

}
