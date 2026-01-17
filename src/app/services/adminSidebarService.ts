import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminSidebarService {
    isOpen = signal(false);

    toggle() {
        this.isOpen.set(!this.isOpen());
    }

    close() {
        this.isOpen.set(false);
    }

    open() {
        this.isOpen.set(true);
    }
}
