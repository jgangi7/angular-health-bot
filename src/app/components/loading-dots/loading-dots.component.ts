import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-dots',
  standalone: true,
  template: `
    <div class="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `,
  styles: [`
    .loading-dots {
      display: flex;
      gap: 4px;
      padding: 8px 12px;
      background: #f0f0f0;
      border-radius: 1rem;
      width: fit-content;
      margin: 8px 0;
    }

    .loading-dots span {
      width: 8px;
      height: 8px;
      background: #6B73FF;
      border-radius: 50%;
      display: inline-block;
      animation: bounce 1.4s infinite ease-in-out;
    }

    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    :host-context(.dark-mode) .loading-dots {
      background: #3d3d3d;
    }
  `]
})
export class LoadingDotsComponent {} 