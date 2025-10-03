import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AutoresPage } from './pages/authors/authors.component';
import { PublisherComponent } from '../publisher/publisher.component';
import { LivrosService } from './services/livros.service';
import { BooksComponent } from './pages/books/books.components';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'autores', component: AutoresPage, canActivate: [authGuard]},
    {path: 'editoras', component: PublisherComponent, canActivate: [authGuard]},
    {path: 'livros', component: BooksComponent, canActivate: [authGuard]},
];
