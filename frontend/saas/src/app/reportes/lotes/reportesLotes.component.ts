import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cuenta/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportesLotes.component.html',
  styleUrls: ['./reportesLotes.component.css']
})
export class ReportesComponent implements OnInit {
  
  url = environment.apiUrl
  
  lotesCargados: Lote[] = []
  
  selectedLote: string = "Seleccione un lote"
  fechaLote: string = "Seleccione un lote"
  foundUsername: any = "Seleccione un lote"

  infoProductos: infoProducto[] = []

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    const rq: any = {
      session: this.authService.sessionId,
      loggedin: this.authService.status,
    }
    this.http.post(this.url + "/lotes/get-all_lotes.php", rq).subscribe(
      (response: any) => {
        this.lotesCargados = response
      }
    )
  }


  loteChange(lote: string) {
    let match: RegExpExecArray | null
    try {

      match = /(.*) #(.*)/gm.exec(lote)

      this.selectedLote = match![2]
      this.fechaLote = match![1]
      
      let rq: any = {
        session: this.authService.sessionId,
        loggedin: this.authService.status,
        searchId: this.selectedLote
      }
      
      this.http.post(this.url + "/cuentas/get-user.php", rq).subscribe((response: any) => {
        this.foundUsername = (response.message)
      })

      this.http.post(this.url + "/lotes/get-productos_en_lote.php", rq).subscribe((response: any) => {
        this.infoProductos = (response)
      })
    } catch (error) {
      // console.log(error)
      this.selectedLote = "Seleccione un lote"
      this.fechaLote = "Seleccione un lote"
      this.foundUsername = "Seleccione un lote"
      this.infoProductos = []
    }

    // console.log(this.infoProductos)
  }

  agotar(idProducto: string, idLote: string){
    let rq2: any = {
      session: this.authService.sessionId,
      loggedin: this.authService.status,
      id_producto: idProducto,
      id_lote: idLote
    }
    this.http.post(this.url + "/lotes/agotar_productos.php", rq2).subscribe((response: any) => {
      console.log(response)
    })
  }
  descargarImagen(idImagen: string, nombreArchivo: string) {
    const img = document.getElementById(idImagen) as HTMLImageElement;
    fetch(img.src)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo + '.png';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error(error));
  }
}

interface Lote {
  id: string,
  ingreso: string,
  idpersonal: string
}

interface infoProducto{
  idlote: string,
  idproducto: string,
  img_url: string,
  nombre: string,
  farmaceuta: string,
  cantidad: string,
  expiracion: string,
  agotado: boolean
}