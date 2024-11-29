// src/app/features/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-6">
    

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
          <div class="space-y-2">
            <a 
              routerLink="/products" 
              class="block text-blue-500 hover:text-blue-600"
            >
              Browse Products
            </a>
            <a 
              routerLink="/profile" 
              class="block text-blue-500 hover:text-blue-600"
            >
              My Profile
            </a>
          </div>
        </div>

        <!-- <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">Google Search</h3>
          <div class="flex">
            <input 
              type="text" 
              placeholder="Search Google..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-l"
            >
            <button 
              class="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div> -->
      </div>
    </div>
  `
})
export class DashboardComponent {
  showWarning = true;
  currentTime = new Date().toLocaleTimeString();

  closeWarning() {
    this.showWarning = false;
  }
}