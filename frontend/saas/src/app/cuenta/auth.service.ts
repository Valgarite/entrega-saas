import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // borrar todos estos datos después y convertir status a false
  public status = false;
  public sessionId = '';
  public userLogged = '';

  constructor(private http: HttpClient) { }
    
  isAuthenticated(){
    return this.status;
  }

}
