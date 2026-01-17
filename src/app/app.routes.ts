import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';

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
        path: '**',
        redirectTo: 'home'
    }
];
