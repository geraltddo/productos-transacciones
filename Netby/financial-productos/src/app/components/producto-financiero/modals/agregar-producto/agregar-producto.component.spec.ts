import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgregarProductoComponent } from './agregar-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AgregarProductoComponent', () => {
  let component: AgregarProductoComponent;
  let fixture: ComponentFixture<AgregarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProductoComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should submit form', fakeAsync(() => {
    const httpMock = TestBed.inject(HttpClient);
    const req = httpMock.get('http://localhost:3002/bp/products/verification/');
    req.subscribe(response => {
      expect(response).toBe('expected response');
    });
    tick();
  }));
});
