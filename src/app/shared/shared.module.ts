import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  providers: [
    AuthService
  ]
})

export class SharedModule {}