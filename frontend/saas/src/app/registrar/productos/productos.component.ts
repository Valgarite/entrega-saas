import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/cuenta/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos = {
    nombre: '',
    farmaceuta: '',
  }
  
  // img: File | null = null

  // imageSrc: any = ''
  // status: boolean = false;
  imageSrc:any = '';
  status:boolean = false;
   
  constructor(private http: HttpClient, private authService: AuthService){}

  url = environment.apiUrl
  nombre!: string
  farmaceuta!: string


  onFileSelected(event: any){
    this.status = false
    const file = event.target.files[0];
    this.status = event.target.files.length>0?true:false
    if(this.status==true){
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.imageSrc = reader.result;
       }
    }
  }
  
  submit(){
    let sent = {
      'session': this.authService.sessionId,
      'nombre': [this.nombre],
      'farmaceuta': [this.farmaceuta],
      'image': this.imageSrc
    }
    
    console.log('sent: ', sent)
    // this.http.post(this.url + '/form-prod.php', {session: this.authService.sessionId, nombre: [this.nombre], farmaceuta: [this.farmaceuta]}).subscribe(
    this.http.post(this.url + '/form-prod.php', sent).subscribe(
      (response: any) => {alert(response.message); console.log(response)}
    );

  }


  camposNuevos(){
    
  }
  // onFileSelected(event: any){
  //   this.status=false
  //   this.selectedFile = <File>event.target.files[0];
  //   this.status = event.target.files.length>0?true:false
  //   console.log(this.status)
  //   if(this.status==true){
  //     console.log('bien BIEN BIEN')
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.selectedFile);
  //     reader.onload = () => {
  //       this.imageSrc = reader.result;   
  //     }
  //     console.log(this.imageSrc)
  // }
// }
}
