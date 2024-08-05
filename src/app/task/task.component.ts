import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { Task } from '../hr-personnel/hr-personnel.component';
import { NewHireComponent } from '../new-hire/new-hire.component';
import { NewHireTask } from '../task-dashboard/task-dashboard.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  // TODO: add support for showing proper pdf file
  @Input() task: NewHireTask = {} as NewHireTask;
  @Input() edit: boolean = false;
  fileForm: FormGroup = {} as FormGroup;
  textForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {}
  ngOnInit(): void {
    console.log('Task component initialized');
    this.fileForm = this.fb.group({
      files: [null, Validators.required],
    });

    this.textForm = this.fb.group({
      response: ['', Validators.required],
    });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    this.fileForm.patchValue({ files: files });
    this.fileForm.get('files')?.updateValueAndValidity();
  }

  onFileFormSubmit() {
    console.log('File form submitted', this.fileForm, this.fileForm.valid);
    if (this.fileForm.valid) {
      this.fileUploadService
        .uploadFileAndData(
          {
            ...this.task,
            status: 'completed',
          },
          this.fileForm.get('files')?.value
        )
        .subscribe((response) => {
          console.log('File upload response', response);
        });
    }
  }

  get files() {
    return this.fileForm.get('files');
  }

  onTextFormSubmit(): void {
    if (this.textForm.valid) {
      console.log('Text form submitted', this.textForm.value);
      this.fileUploadService
        .uploadFileAndData({
          ...this.task,
          status: 'completed',
          response: this.textForm.get('response')?.value,
        })
        .subscribe((response) => {
          console.log('Input task responded', response);
        });
    }
  }
}
