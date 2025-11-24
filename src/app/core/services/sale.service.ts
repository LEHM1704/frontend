import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  // Enviar la venta al backend
  registrarVenta(venta: { items: any[]; total: number }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, venta);
  }
}
