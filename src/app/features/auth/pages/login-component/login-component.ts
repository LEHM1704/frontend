import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: 'Completa los campos correctamente',
      });
      return;
    }

    this.loading = true;
    const creds = this.loginForm.value;

    this.authService.login(creds).subscribe({
      next: (resp) => {
        this.loading = false;

        // Validamos tu estándar: tipo 1 = Éxito
        if (resp.tipo === 1) {
          this.authService.saveSession(resp.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenido',
            detail: 'Acceso correcto',
          });

          // Redirigir al Dashboard de Productos
          // IMPORTANTE: Ruta '/admin/productos' según definimos en routing
          setTimeout(() => {
            this.router.navigate(['/admin/productos']);
          }, 1000);
        } else if (resp.tipo === 2) {
          this.messageService.add({ severity: 'warn', summary: 'Atención', detail: resp.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Conexión',
          detail: 'No se pudo contactar al servidor',
        });
      },
    });
  }
}
