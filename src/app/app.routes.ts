import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { LoginPage } from './pages/login-page/login-page';
import { AdminLayoutPage } from './pages/admin-layout-page/admin-layout-page';
import { AdminProductsPage } from './pages/admin-products-page/admin-products-page';
import { AdminCategoriesPage } from './pages/admin-categories-page/admin-categories-page';
import { PrivacyPage } from './pages/privacy-page/privacy-page';
import { CookiesPage } from './pages/cookies-page/cookies-page';
import { LegalPage } from './pages/legal-page/legal-page';
import { authGuard } from './guards/auth.guard';

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
        path: 'privacy',
        component: PrivacyPage
    },
    {
        path: 'cookies',
        component: CookiesPage
    },
    {
        path: 'legal',
        component: LegalPage
    },
    {
        path: 'admin',
        component: AdminLayoutPage,
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'products' },
            { path: 'products', component: AdminProductsPage },
            { path: 'categories', component: AdminCategoriesPage },
        ],
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
