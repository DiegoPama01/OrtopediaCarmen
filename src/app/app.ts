import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// Re-trigger build
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { filter, map, mergeMap } from 'rxjs';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  showLayout = signal(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.showLayout.set(!url.includes('/login') && !url.includes('/admin'));

      let route = this.activatedRoute;
      while (route.firstChild) route = route.firstChild;

      const data = route.snapshot.data;
      if (data['title']) {
        this.seoService.updateTitle(data['title']);
      }
      if (data['description']) {
        this.seoService.updateDescription(data['description']);
      }
    });
  }
}
