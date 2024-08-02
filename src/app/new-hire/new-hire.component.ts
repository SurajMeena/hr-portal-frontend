import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from '../hr-personnel/hr-personnel.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskDashboardComponent } from '../task-dashboard/task-dashboard.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-new-hire',
  standalone: true,
  imports: [
    CommonModule,
    TaskDashboardComponent,
    ModalComponent,
    TaskComponent,
  ],
  templateUrl: './new-hire.component.html',
  styleUrl: './new-hire.component.css',
})
export class NewHireComponent {
  userName: string = 'Jake';
  role: string = 'UX Designer';
  company: string = 'Searce';
  daysToGo: number = 28;
  firstDay: string = 'Monday, 1st December 2022';
  
  tasks: Task[] = [
    {
      name: 'Upload your AADHAR',
      type: 'File upload',
      status: 'completed',
      details: '',
    },
    {
      name: 'Upload your PAN card',
      type: 'File upload',
      status: 'pending',
      details: 'Pending',
    },
    {
      name: 'Read the company policy documents',
      type: 'Text input | 1 Answer submitted',
      status: 'completed',
      details: '',
    },
    {
      name: 'Submit your feedback on Pre-onboard experience',
      type: 'Text input | 1 Answer submitted',
      status: 'completed',
      details: '',
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}
