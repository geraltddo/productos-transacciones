import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoFinancieroComponent } from './producto-financiero.component';
import { IProducto } from 'src/app/models/IProducto';

describe('ProductoFinancieroComponent', () => {
  let component: ProductoFinancieroComponent;
  let fixture: ComponentFixture<ProductoFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoFinancieroComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close modal', () => {
    let producto: IProducto = {
      id: 12,
      nombre: 'nombre producto',
      descripcion: 'creando el producto',
      imagen: 'assets-12.png',
      categoria: 'categoria',
      precio: 12,
      stock: 12
    }
    component.openModal(producto);
    expect(component.showModal).toBe(true);
    component.closeModal();
    expect(component.showModal).toBe(false);
  });
});
