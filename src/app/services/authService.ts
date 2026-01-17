import { computed, Injectable, signal } from '@angular/core';
import { supabase } from '../lib/supabase.client';
import type { Session, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly session = signal<Session | null>(null);
  readonly user = computed<User | null>(() => this.session()?.user ?? null);
  readonly isLoggedIn = computed(() => !!this.user());

  constructor() {
    // 1) Cargar sesión actual
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) this.error.set(error.message);
      this.session.set(data.session ?? null);
      this.loading.set(false);
    });

    // 2) Escuchar cambios de auth (login/logout/refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session ?? null);
    });
  }

  async signIn(email: string, password: string) {
    this.error.set(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      this.error.set(error.message);
      return { ok: false as const, error: error.message };
    }
    this.session.set(data.session ?? null);
    return { ok: true as const };
  }

  async signUp(email: string, password: string) {
    this.error.set(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      this.error.set(error.message);
      return { ok: false as const, error: error.message };
    }
    // Ojo: según config, puede requerir confirmación por email
    this.session.set(data.session ?? null);
    return { ok: true as const };
  }

  async signOut() {
    this.error.set(null);
    const { error } = await supabase.auth.signOut();
    if (error) this.error.set(error.message);
    this.session.set(null);
  }
}
