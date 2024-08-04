import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee, Task } from '../hr-personnel/hr-personnel.component';

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.css',
})
export class EditDetailsComponent implements OnInit {
  @Input() employee: Employee = {} as Employee;
  @Input() isNewHire = false;
  @Output() onClose = new EventEmitter<void>();
  errorMsg: string = '';
  hireForm: FormGroup = new FormGroup({});
  taskList: Task[] = [];
  new_tasks: number[] = [];
  availableTasks: Task[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  // TODO: add red color to asterisk
  ngOnInit() {
    const baseUrl = 'http://localhost:8000/portal/';
    this.hireForm = this.fb.group({
      name: [this.employee.name, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      contactNo: [this.employee.contactNo, Validators.required],
      dateOfJoining: [
        this.formatDate(this.employee.dateOfJoining),
        Validators.required,
      ],
      tasks: this.fb.array([]),
    });
    this.http
      .get(baseUrl + `new-hires/${this.employee?.id}/tasks`)
      .subscribe((tasks: any) => {
        console.log('fetched pure tasks', tasks);
        this.taskList = tasks.map((task: any) => {
          return {
            id: task.task_id,
            title: task.title,
            type: task.type,
            description: task.description,
          };
        });
        for (const task of this.taskList) {
          this.addTask(task);
        }
      });
    this.http.get(baseUrl + 'tasks').subscribe((tasks: any) => {
      this.availableTasks = tasks.map((task: any) => {
        return {
          id: task.id,
          title: task.title,
          type: task.task_type,
          description: task.description,
        };
      });
    });
  }

  get taskForms(): FormArray<any> {
    if (this.hireForm.get('tasks')) {
      return this.hireForm.get('tasks') as FormArray<any>;
    } else {
      return new FormArray<any>([]);
    }
  }

  createTaskForm(task: Task = {} as Task): FormGroup {
    console.log('task form', task);
    return this.fb.group({
      title: [task.title || '', Validators.required],
      type: [task.type || '', Validators.required],
      description: [task.description || '', Validators.required],
    });
  }

  addTask(task: Task = {} as Task) {
    this.taskForms.push(this.createTaskForm(task));
  }

  onSubmit() {
    console.log('Save clicked', this.hireForm.valid);
    console.log('Form value', this.hireForm.value);
    if (this.taskForms.length > this.taskList.length) {
      for (let i = this.taskList.length; i < this.taskForms.length; i++) {
        console.log('new task', this.taskForms.at(i).value);
        this.http
          .post(
            'http://localhost:8000/portal/tasks/create',
            this.taskForms.at(i).value
          )
          .subscribe(
            (response: any) => {
              console.log('task added', response);
              this.new_tasks.push(response.id);
              console.log('new tasks added', this.new_tasks);
              this.assignTask(
                this.employee.id,
                response.id,
                this.employee.dateOfJoining
              );
            },
            (error: any) => {
              if (error.status === 400) {
                console.log('Error:', error.error);
              } else {
                console.log('General error handling');
              }
            }
          );
      }
    }
    if (this.hireForm.invalid) {
      this.hireForm.markAllAsTouched();
    }
    if (this.hireForm.valid) {
      console.log(this.hireForm.value);
      // TODO: Handle form submission
    } else {
      // TODO: Handle validation errors
    }
  }

  get name() {
    return this.hireForm.get('name');
  }

  get email() {
    return this.hireForm.get('email');
  }

  get contactNo() {
    return this.hireForm.get('contactNo');
  }

  get dateOfJoining() {
    return this.hireForm.get('dateOfJoining');
  }

  getTaskControl(index: number, controlName: string) {
    return this.taskForms.at(index).get(controlName);
  }

  private formatDate(date?: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  assignTask(newHireId: number, taskId: number, completionDate: string) {
    let isSuccessful = false;
    this.http
      .post('http://localhost:8000/portal/tasks/assign', {
        task_id: taskId,
        new_hire_id: this.employee.id,
        completion_date: completionDate,
      })
      .subscribe(
        (response: any) => {
          console.log('task assigned', response);
          this.errorMsg = '';
          isSuccessful = true;
        },
        (error) => {
          if (error.status === 400) {
            console.log('Error:', error.error.error);
            this.errorMsg = error.error.error;
          } else {
            console.log('Error:', error.error);
          }
          isSuccessful = false;
        }
      );
    return isSuccessful;
  }
}
