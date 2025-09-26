import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Editora } from '../models/editor';
import { EditorasService } from './editores.services';

const storage = {
  get: (k: string) => (typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null),
  set: (k: string, v: string) => { if (typeof localStorage !== 'undefined') localStorage.setItem(k, v); },
  del: (k: string) => { if (typeof localStorage !== 'undefined') localStorage.removeItem(k); },
};

@Injectable({ providedIn: 'root' })
export class EditorsService {
  private _editoras = signal<Editora[]>(storage.get('editoras') ? JSON.parse(storage.get('editoras')!) : []);

  constructor(private editorasService: EditorasService) {}

  editoras = () => this._editoras();

  listar(): Observable<Editora[]> {
    return this.editorasService.listar().pipe(
      tap(data => {
        this._editoras.set(data);
        storage.set('editoras', JSON.stringify(data));
      })
    );
  }

  reset() {
    this._editoras.set([]);
    storage.del('editoras');
  }
}
