import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login, User } from '../interfaces/auth';
import { tap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(request: Login) {
    return this.http.post<ApiResponse<User>>(`${environment.api}/v1/auth`, request).pipe(
      tap(res => {
        if (res && res.data) {
          localStorage.setItem('user', JSON.stringify(res.data))
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  get user(): User | null {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

}
