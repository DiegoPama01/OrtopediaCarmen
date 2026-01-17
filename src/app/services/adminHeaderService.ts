import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminHeaderService {
  title = signal('Gestión');
  subtitle = signal('');
  ctaLabel = signal<string | null>(null);

  onCta = signal<(() => void) | null>(null);

  setHeader(opts: { title: string; subtitle?: string; ctaLabel?: string | null; onCta?: (() => void) | null }) {
    this.title.set(opts.title);
    this.subtitle.set(opts.subtitle ?? '');
    this.ctaLabel.set(opts.ctaLabel ?? null);
    this.onCta.set(opts.onCta ?? null);
  }
}
