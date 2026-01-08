import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { StudentsService, Student, CreateStudentDto } from './students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div style="padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h2 style="margin:0;">Estudiantes</h2>
        <button pButton label="Nuevo" icon="pi pi-plus" (click)="openNew()"></button>
      </div>
      <p-table [value]="students()" paginator [rows]="5">
        <ng-template pTemplate="header">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Email</th>
            <th style="width:140px;">Acciones</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-s>
          <tr>
            <td>{{ s.codigo }}</td>
            <td>{{ s.nombre_completo }}</td>
            <td>{{ s.carrera }}</td>
            <td>{{ s.email }}</td>
            <td>
              <div style="display:flex; gap:8px;">
                <button
                  pButton
                  icon="pi pi-pencil"
                  severity="info"
                  (click)="openEdit(s)"
                  title="Editar"
                ></button>

                <button
                  pButton
                  icon="pi pi-trash"
                  severity="danger"
                  (click)="confirmDelete(s)"
                  title="Eliminar"
                ></button>
              </div>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="5">No se encontraron estudiantes.</td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog
      header="Nuevo estudiante"
      [(visible)]="newDialog"
      [modal]="true"
      [closable]="true"
      [draggable]="false"
      [resizable]="false"
      [style]="{ width: '480px' }"
      (onHide)="resetForm()"
    >
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div>
          <label>Código</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.codigo" />
        </div>

        <div>
          <label>Nombre completo</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.nombre_completo" />
        </div>

        <div>
          <label>Carrera</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.carrera" />
        </div>

        <div>
          <label>Email</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.email" />
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
          <p-button label="Cancelar" severity="secondary" (onClick)="newDialog=false"></p-button>
          <p-button label="Guardar" [disabled]="saving" (onClick)="saveNew()"></p-button>
        </div>
      </div>
    </p-dialog>


    <p-dialog
      header="Editar estudiante"
      [(visible)]="editDialog"
      [modal]="true"
      [closable]="true"
      [draggable]="false"
      [resizable]="false"
      [style]="{ width: '480px' }"
      (onHide)="closeEdit()"
    >
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div>
          <label>Código</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.codigo" />
        </div>

        <div>
          <label>Nombre completo</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.nombre_completo" />
        </div>

        <div>
          <label>Carrera</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.carrera" />
        </div>

        <div>
          <label>Email</label>
          <input pInputText style="width:100%;" [(ngModel)]="form.email" />
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
          <p-button label="Cancelar" severity="secondary" (onClick)="closeEdit()"></p-button>
          <p-button label="Guardar cambios" [disabled]="saving" (onClick)="saveEdit()"></p-button>
        </div>
      </div>
    </p-dialog>
  `
})
export class StudentsPage implements OnInit {
  students = signal<Student[]>([]);

  newDialog = false;


  editDialog = false;
  editingId: number | null = null;

  saving = false;

  form: CreateStudentDto = {
    codigo: '',
    nombre_completo: '',
    carrera: '',
    email: ''
  };

  constructor(
    private studentsService: StudentsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: (data) => this.students.set(data),
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar estudiantes'
        });
      }
    });
  }



  openNew() {
    this.newDialog = true;
    this.resetForm();
  }


  openEdit(student: Student) {
    this.editingId = student.id;
    this.form = {
      codigo: student.codigo,
      nombre_completo: student.nombre_completo,
      carrera: student.carrera,
      email: student.email
    };
    this.editDialog = true;
    this.saving = false;
  }

  closeEdit() {
    this.editDialog = false;
    this.editingId = null;
    this.resetForm();
  }

  resetForm() {
    this.form = { codigo: '', nombre_completo: '', carrera: '', email: '' };
    this.saving = false;
  }

  saveNew() {
    const payload = {
      codigo: this.form.codigo.trim(),
      nombre_completo: this.form.nombre_completo.trim(),
      carrera: this.form.carrera.trim(),
      email: this.form.email.trim()
    };

    if (!payload.codigo || !payload.nombre_completo || !payload.carrera || !payload.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Completa todos los campos'
      });
      return;
    }

    this.saving = true;

    this.studentsService.createStudent(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Creado',
          detail: 'Estudiante agregado correctamente'
        });
        this.newDialog = false;
        this.loadStudents();
        this.saving = false;
      },
      error: (err) => {
        console.error(err);
        const msg =
          err?.status === 409 ? 'Código o email ya existe' : 'No se pudo crear el estudiante';

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: msg
        });
        this.saving = false;
      }
    });
  }


  saveEdit() {
    if (this.editingId == null) return;

    const payload = {
      codigo: this.form.codigo.trim(),
      nombre_completo: this.form.nombre_completo.trim(),
      carrera: this.form.carrera.trim(),
      email: this.form.email.trim()
    };

    if (!payload.codigo || !payload.nombre_completo || !payload.carrera || !payload.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Completa todos los campos'
      });
      return;
    }

    this.saving = true;

    this.studentsService.updateStudent(this.editingId, payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Estudiante actualizado correctamente'
        });
        this.editDialog = false;
        this.editingId = null;
        this.loadStudents();
        this.saving = false;
      },
      error: (err) => {
        console.error(err);
        const msg =
          err?.status === 409 ? 'Código o email ya existe' : 'No se pudo actualizar el estudiante';

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: msg
        });
        this.saving = false;
      }
    });
  }


  confirmDelete(student: Student) {
    const ok = confirm(`¿Eliminar a ${student.nombre_completo}?`);
    if (!ok) return;

    this.studentsService.deleteStudent(student.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Estudiante eliminado'
        });
        this.loadStudents();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el estudiante'
        });
      }
    });
  }
}
