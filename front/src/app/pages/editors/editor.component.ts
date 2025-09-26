import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditorasService } from '../../services/editores.services';
import { Editora } from '../../models/editor';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
      <h1>Editoras</h1>

      <p *ngIf="carregando()">Carregando…</p>
      <p *ngIf="erro()" style="color:#c62828">{{ erro() }}</p>

      <ul *ngIf="!carregando() && !erro()" style="padding-left:1.25rem">
        <li *ngFor="let e of editoras()" style="margin:.25rem 0">
          <strong>{{ e.nome }}</strong> — <em>{{ e.cnpj }}</em>
          <div style="color:#555">{{ e.endereco }}</div>
          <div *ngIf="e.email">E-mail: {{ e.email }}</div>
          <div *ngIf="e.site">Site: {{ e.site }}</div>
        </li>
      </ul>

      <nav style="margin-top:1rem">
        <a routerLink="/">Voltar ao início</a>
      </nav>
    </section>
  `
})
export class EditorasPage {
  private svc = inject(EditorasService);

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
