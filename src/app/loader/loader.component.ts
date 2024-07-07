import { Component } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="isLoading">
      <div class="loader"></div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .loader {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}


// loadData() {
//   this.loaderService.show();
//   this.http.get('https://api.example.com/data').subscribe(
//     data => {
//       console.log(data);
//       this.loaderService.hide();
//     },
//     error => {
//       console.error(error);
//       this.loaderService.hide();
//     }
//   );
// }
