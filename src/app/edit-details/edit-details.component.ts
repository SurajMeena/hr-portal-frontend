import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../hr-personnel/hr-personnel.component';

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
  hireForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) {}
  // TODO: add red color to asterisk
  ngOnInit() {
    this.hireForm = this.fb.group({
      name: [this.employee.name, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      contactNo: [this.employee.contactNo, Validators.required],
      dateOfJoining: [
        this.formatDate(this.employee.dateOfJoining),
        Validators.required,
      ],
      tasks: this.fb.array([this.createTaskForm()]),
    });
  }

  get taskForms(): FormArray<any> {
    if (this.hireForm.get('tasks')) {
      return this.hireForm.get('tasks') as FormArray<any>;
    } else {
      return new FormArray<any>([]);
    }
  }

  createTaskForm(task: any = {}): FormGroup {
    return this.fb.group({
      title: [task.title || 'Upload AADHAR card', Validators.required],
      type: [task.type || '', Validators.required],
      description: [task.description || '', Validators.required],
    });
  }

  addTask() {
    this.taskForms.push(this.createTaskForm());
  }

  onSubmit() {
    console.log('Save clicked', this.hireForm.valid);
    console.log('Form value', this.hireForm.value);
    if (this.hireForm.invalid) {
      this.hireForm.markAllAsTouched();
    }
    if (this.hireForm.valid) {
      console.log(this.hireForm.value);
      // Handle form submission
    } else {
      // Handle validation errors
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
}
