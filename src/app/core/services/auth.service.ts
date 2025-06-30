import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Login, User } from '../interfaces/auth';
import { tap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(request: Login) {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.api}/v1/auth`, request).pipe(
      tap(res => {
        if (res && res.data) {
          localStorage.setItem('token', res.data.accessToken)
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get user(): User | null {
    // const data = localStorage.getItem('token');
    // if (data) {
    //   return JSON.parse(data);
    // }
    // return null;

    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      const parts = token.split('.');

      if (parts.length !== 3) {
        throw new Error('Invalid token');
      }

      const payload = parts[1];

      let base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');

      const padding = base64Url.length % 4;
      if (padding) {
        base64Url += '='.repeat(4 - padding);
      }

      const decodedPayload = atob(base64Url);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }


}
