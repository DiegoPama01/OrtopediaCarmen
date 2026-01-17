import { Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { AboutComponent } from '../../components/home/about/about.component';
import { CategoriesComponent } from '../../components/home/categories/categories.component';
import { TestimonialsComponent } from '../../components/home/testimonials/testimonials.component';
import { ContactComponent } from '../../components/home/contact/contact.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, AboutComponent, CategoriesComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
