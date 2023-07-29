import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { AuthService } from 'src/app/cuenta/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-reportes-productos',
  templateUrl: './reportes-productos.component.html',
  styleUrls: ['./reportes-productos.component.css']
})
export class ReportesProductosComponent implements OnInit {

  url = environment.apiUrl

  lotesCargados: Lote[] = []
  productosCargados: Producto[] = []
  productoSeleccionado: Producto = {
    id: '',
    nombre: '',
    img_url: '',
    farmaceuta: ''
  }


  barChartData: any = {
    type: 'bar',
    labels: [],
    datasets: [{
      data: [],
      label: 'cantidad'
    }]
  }

  barChartOptions: ChartOptions = {}

  selectedProductoId: string = "Seleccione un producto"
  selectedProductoFarmaceuta: string = "Seleccione un producto"
  selectedProductoNombre: string = "Seleccione un producto"
  selectedImg: string = ""
  imgPath = ''

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

    this.http.post(this.url + "productos/get-all_productos.php", rq).subscribe(
      (response: any) => {
        this.productosCargados = response
      }
    )
  }

  productoChange(producto: string) {
    const matches = /#(.*)\s-\s(.*):\s(.*)/gm.exec(producto)

    try {
      this.selectedProductoId = matches![1]
      this.selectedProductoFarmaceuta = matches![2]
      this.selectedProductoNombre = matches![3]
      const rq = {
        session: this.authService.sessionId,
        loggedin: this.authService.status,
        idSearch: matches![1]
      }

      this.http.post(this.url + "/productos/get-producto.php", rq).subscribe((response: any) => {
        this.productoSeleccionado = (response.rs1[0])
        this.infoProductos = (response.rs1)
        this.imgPath = this.url + 'download-img.php?id=' + response.rs1[0].img_url

        this.loadGraph(response.rs1)
      })

    } catch (error) {
      this.selectedProductoId = "Seleccione un producto"
      this.selectedProductoFarmaceuta = "Seleccione un producto"
      this.selectedProductoNombre = "Seleccione un producto"
      this.infoProductos = []
      this.productoSeleccionado = {
        id: '',
        nombre: '',
        img_url: '',
        farmaceuta: ''
      }
      this.selectedImg = ""
      this.imgPath = ''
      this.barChartData = {
        type: 'bar',
        labels: [],
        datasets: [{
          data: [],
          label: 'cantidad'
        }]
      }
    }
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
  loadGraph(dataGraph: any){
    console.log(dataGraph)
    const array = this.getValuesByKeys(dataGraph, ["cantidad", "idlote", "agotado"])

    const filteredArray = this.removeAgotados(array, 'agotado')

    this.barChartData = {
      type: 'bar',
      labels: filteredArray['idlote'],
      datasets: [{
        data: filteredArray['cantidad'],
        label: 'cantidad'
      }]
    }
  }

  getValuesByKeys<T>(array: T[], keys: Array<keyof T>): Record<keyof T, T[keyof T][]> {
    return keys.reduce((acc, key) => {
      acc[key] = array.map((obj) => obj[key]);
      return acc;
    }, {} as Record<keyof T, T[keyof T][]>);
  }

  removeAgotados<T>(obj: Record<string, T[]>, agotadoKey: string): Record<string, T[]> {
    const agotadoArr = obj[agotadoKey];
    const filteredArrays = Object.keys(obj)
      .filter((key) => key !== agotadoKey)
      .map((key) => obj[key].filter((_, i) => agotadoArr[i] !== 1));

    return Object.assign({}, ...Object.keys(obj)
      .map((key, i) => ({ [key]: i === 0 ? filteredArrays[i] : obj[key].filter((_, i) => agotadoArr[i] !== 1) }))
    );
  }


  agotar(idProducto: string, idLote: string) {
    let rq2: any = {
      session: this.authService.sessionId,
      loggedin: this.authService.status,
      id_producto: idProducto,
      id_lote: idLote
    }
    this.http.post(this.url + "/lotes/agotar_productos.php", rq2).subscribe((response: any) => {
      alert("Se ha alterado este producto.")
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

interface Producto {
  id: string
  nombre: string
  img_url: string
  farmaceuta: string
}

interface infoProducto {
  idlote: string,
  idproducto: string,
  img_url: string,
  nombre: string,
  farmaceuta: string,
  cantidad: string,
  expiracion: string,
  agotado: boolean
}