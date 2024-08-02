import { Routes } from '@angular/router';
import { HrPersonnelComponent } from './hr-personnel/hr-personnel.component';
import { NewHireComponent } from './new-hire/new-hire.component';

export const routes: Routes = [
  { path: 'hr-personnel', component: HrPersonnelComponent },
  { path: 'new-hire', component: NewHireComponent },
  { path: '', redirectTo: '/hr-personnel', pathMatch: 'full' },
];
