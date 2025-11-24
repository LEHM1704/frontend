import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Obligatorio para PrimeNG
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Para conectar con PHP
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para validaciones

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { SharedModule } from './shared/shared-module';
import Aura from '@primeuix/themes/aura';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    ToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
