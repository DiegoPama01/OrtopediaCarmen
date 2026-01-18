import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private title = inject(Title);
    private meta = inject(Meta);
    private document = inject(DOCUMENT);

    updateTitle(title: string) {
        this.title.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'twitter:title', content: title });
    }

    updateDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'twitter:description', content: description });
    }

    updateKeywords(keywords: string) {
        this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    setStructuredData(data: any) {
        let script = this.document.getElementById('structured-data') as HTMLScriptElement;
        if (script) {
            script.text = JSON.stringify(data);
        } else {
            script = this.document.createElement('script');
            script.id = 'structured-data';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(data);
            this.document.head.appendChild(script);
        }
    }
}
