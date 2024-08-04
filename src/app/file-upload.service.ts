import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewHireTask } from './task-dashboard/task-dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFileAndData(files: FileList, jsonData: NewHireTask) {
    const formData = new FormData();
    const baseUrl = 'http://localhost:8000/portal/';
    for (let i = 0; i < files.length; i++) {
      console.log(files[i], files[i].name);
      formData.append('files', files[i], files[i].name);
    }
    formData.append('json', JSON.stringify(jsonData));

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    // for (let pair of (formData as any).entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    return this.http.post(baseUrl + `new-hires/${jsonData.taskId}/update`, formData, {
      headers: headers,
    });
  }
}
