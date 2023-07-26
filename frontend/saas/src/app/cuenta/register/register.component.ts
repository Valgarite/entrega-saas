import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  password!: string;
  fecha_nac!: string;

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const url = environment.apiUrl + 'cuentas/registrar.php';
    const data = { username: this.username, password: this.password, fecha_nac: this.fecha_nac};

    // AÑADIR REDIRECCIÓN A LOGIN TRAS REGISTRARSE
    this.http.post(url, data).subscribe(response => {
      console.log(response)
    });
  }
}
