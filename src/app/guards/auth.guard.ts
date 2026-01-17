import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // Convert signals to observables
    const loading$ = toObservable(auth.loading);
    const isLoggedIn$ = toObservable(auth.isLoggedIn);

    return loading$.pipe(
        filter((loading) => !loading), // Wait until loading is false
        take(1), // Take the first 'false' value
        switchMap(() => isLoggedIn$.pipe(take(1))), // Get current login status
        map(() => {
            if (auth.isSessionValid()) {
                return true;
            }
            return router.createUrlTree(['/login']);
        })
    );
};
