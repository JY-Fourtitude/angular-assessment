import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="google-container">
      <iframe
        [src]="googleUrl"
        width="100%"
        height="100%"
        frameborder="0"
        style="border: 0;"
      ></iframe>
    </div>
  `,
  styles: [`
    .google-container {
      width: 100%;
      height: calc(100vh - 60px);
      overflow: hidden;
    }
  `]
})
export class HomeComponent {
  googleUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    // Use proxied URL
    this.googleUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/google');
  }
}