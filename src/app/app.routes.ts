import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'catalog',
        component: CatalogPage
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
