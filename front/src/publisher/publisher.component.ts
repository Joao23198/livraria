import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditorasService } from '../app/services/editores.services';
import { Editora } from '../app/models/editor';
import { AuthService } from '../app/services/auth.services';
    
@Component({
  selector: 'app-publisher.component',
  imports: [RouterLink],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent {
  private svc = inject(EditorasService);
  private auth = inject(AuthService);
  editoras = signal<Editora[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  constructor() {
      this.svc.listar().subscribe({
      next: (data) => { this.editoras.set(data); this.carregando.set(false); },
      error: () => { this.erro.set('Falha ao carregar editoras'); this.carregando.set(false); }
    });
  }
}
