import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  codigo: string;
  nombre_completo: string;
  carrera: string;
  email: string;
  fecha_creacion?: string;
}

export type CreateStudentDto = Omit<Student, 'id' | 'fecha_creacion'>;

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly apiUrl = 'http://localhost:3000/estudiantes';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  createStudent(payload: CreateStudentDto): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, payload);
  }

  updateStudent(id: number, payload: CreateStudentDto): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, payload);
}

deleteStudent(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}

