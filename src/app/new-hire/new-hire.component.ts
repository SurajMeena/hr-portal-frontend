import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, Task } from '../hr-personnel/hr-personnel.component';
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
export class NewHireComponent implements OnInit {
  daysToGo: number = 28;
  currentUserId?: number;
  currentEmployee?: Employee;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['employeeId'];
    });
    const baseUrl = 'http://localhost:8000/portal/';
    this.http
      .get(baseUrl + `new-hires/${this.currentUserId}`)
      .subscribe((user: any) => {
        this.currentEmployee = this.mapApiResponseToEmployee(user);
        this.daysToGo = this.calculateDaysToGo();
      });
  }

  calculateDaysToGo(): number {
    const today = new Date();
    if (!this.currentEmployee?.dateOfJoining) {
      return 0;
    }
    const firstDay = new Date(this.currentEmployee.dateOfJoining);
    const timeDifference = firstDay.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }
  mapApiResponseToEmployee(user: any): Employee {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      position: user.position,
      dateOfJoining: user.start_date,
      contactNo: user.phone,
      tasksAssigned: user.totalTasks,
      status: {
        completed: user.completedTasks,
        total: user.totalTasks,
      },
      expanded: false, // Default value, can be modified as needed
      tasks: user.tasks,
      company: user.company,
    };
  }
}
