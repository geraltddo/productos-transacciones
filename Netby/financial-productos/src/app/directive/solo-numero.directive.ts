import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSoloNumero]'
})
export class SoloNumeroDirective {

  @Output() cambiaValor = new EventEmitter()
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) 
  onInputChange(event: any) {
    const valorInicial = this._el.nativeElement.value;
    let valorNuevo = valorInicial.replace(/[^0-9.]*/g, '').replace(/(\..*)\./g, '$1');
    // Lógica para evitar múltiples puntos decimales
    if (valorNuevo.split('.').length > 2) {
        valorNuevo = valorNuevo.slice(0, valorNuevo.indexOf('.') + 1) + valorNuevo.slice(valorNuevo.indexOf('.') + 2);
    }
       this._el.nativeElement.value = valorNuevo;
       this.cambiaValor.emit(valorNuevo);
    if ( valorInicial !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
