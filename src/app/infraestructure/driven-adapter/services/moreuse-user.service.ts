import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usergateway } from 'src/app/domain/models/User/gateway/usergateway';
import { Token } from 'src/app/domain/models/token';
import { User } from 'src/app/domain/models/user';

@Injectable({
  providedIn: 'root'
})
export class MoreuseUserService extends Usergateway {

  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<Token> {
   return this.http.post<Token>('https://run.mocky.io/v3/33410e3b-4850-4fcb-ac76-3a48aa458a97', { email, contraseña: password })
  }
  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>('https://dummyjson.com/users/add', { name, email, password })
  }
}
