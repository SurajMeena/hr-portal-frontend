import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../hr-personnel/hr-personnel.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskComponent } from '../task/task.component';

export interface NewHireTask {
  taskId: number;
  title: string;
  type: string;
  status: string;
  description: string;
  completionDate: string;
  fileUpload: string;
  response: string;
  comment: string;
}
@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent, TaskComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.css',
})
export class TaskDashboardComponent implements OnInit {
  @Input() employeeId?: number;
  @Input() edit: boolean = false;
  isModalOpen = false;
  selectedTask: NewHireTask | null = null;
  tasks: NewHireTask[] = [];

  constructor(private http: HttpClient) {
    console.log('TaskDashboardComponent constructor');
  }
  ngOnInit(): void {
    console.log('TaskDashboardComponent initialized');
    const baseUrl = 'http://localhost:8000/portal/';
    this.http
      .get(baseUrl + `new-hires/${this.employeeId}/tasks`)
      .subscribe((response: any) => {
        console.log('fetched tasks', response);
        this.tasks = response.map((task: any) => ({
          taskId: task.task_id,
          title: task.title,
          description: task.description,
          status: task.is_completed ? 'completed' : 'pending',
          type: task.type,
          completionDate: task.completion_date,
          fileUpload: task.file_upload,
          response: task.response,
          comment: task.comment,
        }));
      });
  }

  openModal(task: NewHireTask): void {
    this.isModalOpen = true;
    this.selectedTask = task;
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTask = null;
  }
}
