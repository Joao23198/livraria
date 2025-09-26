import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editora } from '../models/editor';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class EditorasService {
  private http = inject(HttpClient);
  private base = environment.apiBase;
  
  listar(): Observable<Editora[]> {
    const url = `${this.base}api/editoras`; // URL do endpoint de editoras
    return this.http.get<Editora[]>(url);
  }
}
