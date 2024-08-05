import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskDashboardComponent } from '../task-dashboard/task-dashboard.component';
import { TaskComponent } from '../task/task.component';

export interface Task {
  id: number;
  title: string;
  type: string;
  description: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  dateOfJoining: string;
  contactNo: number;
  position?: string;
  department?: string;
  salary?: number;
  company?: string;
  tasksAssigned: number;
  status: {
    completed: number;
    total: number;
  };
  expanded: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-hr-personnel',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    EditDetailsComponent,
    TaskComponent,
    TaskDashboardComponent,
    RouterModule,
  ],
  templateUrl: './hr-personnel.component.html',
  styleUrl: './hr-personnel.component.css',
})
export class HrPersonnelComponent implements OnInit {
  isModalOpen = false;
  isEditDetailsClicked = false;
  addNewHire = false;
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNewHires();
  }

  fetchNewHires() {
    const baseUrl = 'http://localhost:8000/';
    this.http.get(baseUrl + 'portal/new-hires').subscribe((employees: any) => {
      this.employees = employees.map((it: any) =>
        this.mapApiResponseToEmployee(it)
      );
      console.log('parsed api response', this.employees);
    });
  }

  openModal(employee: Employee | null, addNewHire = false) {
    if (this.isEditDetailsClicked) {
      if (employee === null) this.selectedEmployee = {} as Employee;
      else this.selectedEmployee = employee;
      this.addNewHire = addNewHire;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEmployee = null;
    this.addNewHire = false;
    this.isEditDetailsClicked = false;
    this.fetchNewHires();
  }

  mapApiResponseToEmployee(employee: any): Employee {
    const totalTasks = employee.total_tasks;
    const completedTasks = employee.completed_tasks;

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      dateOfJoining: employee.start_date,
      contactNo: employee.phone,
      tasksAssigned: totalTasks,
      status: {
        completed: completedTasks,
        total: totalTasks,
      },
      expanded: false, // Default value, can be modified as needed
      tasks: employee.tasks, // Assuming tasks are directly mapped
    };
  }

  copyToClipboard(employee: Employee) {
    const textarea = document.createElement('textarea');
    textarea.value = window.location.origin + '/new-hire/' + employee.id;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL copied to clipboard!');
  }
}
