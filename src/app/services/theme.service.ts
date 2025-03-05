import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Check if user has a theme preference in localStorage
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme) {
        this.darkMode.next(JSON.parse(savedTheme));
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.darkMode.next(prefersDark);
      }
    } else {
      // Default to light mode during SSR
      this.darkMode.next(false);
    }
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      const currentValue = this.darkMode.value;
      this.darkMode.next(!currentValue);
      localStorage.setItem('darkMode', JSON.stringify(!currentValue));
    }
  }
} 