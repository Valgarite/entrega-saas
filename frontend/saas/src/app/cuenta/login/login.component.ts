import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username!: string;
  password!: string;

  url = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  onSubmit() {
    const url = environment.apiUrl + 'cuentas/login.php';
    const data = { username: this.username, password: this.password };

    this.http.post(url, data).subscribe((response: any) => {
      console.log(response)
      alert(response.message)
      if (response.status == 'success') {
        this.authService.status = response.status == 'success'
        this.authService.sessionId = response.session_id
        this.authService.userLogged = response.user
        alert('entrando')
        this.router.navigateByUrl('');
      }
    })

  }

  // onSubmit() {
  //   const body = JSON.stringify({ username: this.username, password: this.password });
  //   this.http.post(this.url + 'cuentas/login.php', body)
  //     .subscribe(
  //       (response) => {
  //         alert(response);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
}