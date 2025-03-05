import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent, CommonModule],
  template: `
    <div [class.dark-mode]="isDarkMode">
      <div class="app-container">
        <header class="app-header">
          <app-theme-toggle></app-theme-toggle>
        </header>
        <main>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .app-header {
      position: fixed;
      top: 0;
      right: 0;
      padding: 1rem;
      z-index: 1000;
    }

    main {
      padding-top: 4rem;
    }

    :host {
      display: block;
    }

    .dark-mode {
      background-color: #1a1a1a;
      color: #ffffff;
    }

    .dark-mode .feature-card {
      background-color: #2d2d2d;
      color: #ffffff;
    }

    .dark-mode .feature-card h2 {
      color: #ffffff;
    }

    .dark-mode .feature-card p {
      color: #cccccc;
    }
  `]
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }
}
