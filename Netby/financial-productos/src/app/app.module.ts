import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoloNumeroDirective } from './directive/solo-numero.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoFinancieroComponent } from './components/producto-financiero/producto-financiero.component';
import { ToastComponent } from './components/utilitarios/toast/toast.component';
import { AgregarProductoComponent } from './components/producto-financiero/modals/agregar-producto/agregar-producto.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { MenuComponent } from './components/menu/menu.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { AgregarTransaccionComponent } from './components/transacciones/agregar-transaccion/agregar-transaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFinancieroComponent,
    ToastComponent,
    AgregarProductoComponent,
    CabeceraComponent,
    MenuComponent,
    TransaccionesComponent,
    AgregarTransaccionComponent,
    SoloNumeroDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
