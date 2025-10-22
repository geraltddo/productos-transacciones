import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //evita el ciclo de deteccion de cambios
})
export class ToastComponent implements OnInit {

  mensaje:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  public showToast(msj:string = "") {
    let x = document.getElementById("snackbar");
    if (x) {
      x.className = "show";
      x!.innerHTML = msj;
      setTimeout(function () {
        x!.className = x!.className.replace("show", ""); 
      }, 3000);
    }
  }

}
