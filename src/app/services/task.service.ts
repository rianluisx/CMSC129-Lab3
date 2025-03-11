import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateToggle(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  editTask(task: Task): Observable<Task> {
 

    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`);
  }
}
