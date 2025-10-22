import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductoService]
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar los productos', () => {
    expect(service.listarProductos()).toBeTruthy();
  });

  it('deberia crear un producto', () => {
    expect(service.crearProducto({
      id: 12,
      nombre: 'nombre producto',
      descripcion: 'creando el producto',
      imagen: 'assets.png',
      categoria: 'aseo',
      precio: 2.25,
      stock: 20
    })).toBeTruthy();
  });

  it('deberia actualizar un producto', () => {
    expect(service.actualizarProducto({
      id: 12,
      nombre: 'nombre producto actualizado',
      descripcion: 'actualizando el producto',
      imagen: 'assets.png',
      categoria: 'aseo',
      precio: 2.25,
      stock: 20
    })).toBeTruthy();
  });

  it('deberia eliminar un producto', () => {
    expect(service.eliminarProducto(12)).toBeTruthy();
  });
});
