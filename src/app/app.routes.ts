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
        component: HomePage,
        data: {
            title: 'Ortopedia Carmen | Tu ortopedia de confianza en Arrecife, Lanzarote',
            description: 'Ortopedia Carmen en Arrecife, Lanzarote. Especialistas en ayudas técnicas, movilidad y bienestar. Visítanos en Carretera San Bartolomé 5.'
        }
    },
    {
        path: 'catalog',
        component: CatalogPage,
        data: {
            title: 'Catálogo de Productos | Ortopedia Carmen Arrecife',
            description: 'Explora nuestro catálogo de productos ortopédicos: sillas de ruedas, andadores, ayudas para el baño y más en Arrecife, Lanzarote.'
        }
    },
    {
        path: 'login',
        component: LoginPage,
        data: {
            title: 'Acceso Administración | Ortopedia Carmen',
            description: 'Área reservada para la gestión del catálogo de Ortopedia Carmen.'
        }
    },
    {
        path: 'privacy',
        component: PrivacyPage,
        data: {
            title: 'Política de Privacidad | Ortopedia Carmen',
            description: 'Consulta nuestra política de privacidad y protección de datos.'
        }
    },
    {
        path: 'cookies',
        component: CookiesPage,
        data: {
            title: 'Política de Cookies | Ortopedia Carmen',
            description: 'Información sobre el uso de cookies en nuestro sitio web.'
        }
    },
    {
        path: 'legal',
        component: LegalPage,
        data: {
            title: 'Aviso Legal | Ortopedia Carmen',
            description: 'Información legal, términos y condiciones de Ortopedia Carmen.'
        }
    },
    {
        path: 'admin',
        component: AdminLayoutPage,
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'products' },
            { path: 'products', component: AdminProductsPage, data: { title: 'Gestión de Productos | Admin' } },
            { path: 'categories', component: AdminCategoriesPage, data: { title: 'Gestión de Categorías | Admin' } },
        ],
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
