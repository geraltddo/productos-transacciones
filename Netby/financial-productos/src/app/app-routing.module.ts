import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoFinancieroComponent } from './components/producto-financiero/producto-financiero.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';

const routes: Routes = [
  { path: 'producto-financiero', component: ProductoFinancieroComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
