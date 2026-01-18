import { Component, OnInit, inject } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { AboutComponent } from '../../components/home/about/about.component';
import { CategoriesComponent } from '../../components/home/categories/categories.component';
import { TestimonialsComponent } from '../../components/home/testimonials/testimonials.component';
import { ContactComponent } from '../../components/home/contact/contact.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, AboutComponent, CategoriesComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Ortopedia Carmen",
      "image": "https://ortopediacarmen.com/logo.png",
      "@id": "https://ortopediacarmen.com",
      "url": "https://ortopediacarmen.com",
      "telephone": "928 072 698",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carretera San Bartolomé 5, Local 1",
        "addressLocality": "Arrecife",
        "postalCode": "35500",
        "addressRegion": "Las Palmas",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.971512,
        "longitude": -13.564555
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "09:00",
          "closes": "19:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "09:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "13:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/ortopediacarmen"
      ]
    });
  }
}
