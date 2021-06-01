import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User, ResponseUser } from './interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private htttp: HttpClient
  ) { }

  login = (user: User): Observable<ResponseUser> => {
    return this.htttp.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    );
  }

  private setToken = (response: ResponseUser) => {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > new Date(expDate)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logout = () => {
    this.setToken(null);
  }

  isAuthenicated() {
    return !!this.token;
  }
}
