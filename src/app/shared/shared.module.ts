import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthService } from './auth.service';
import { LoaderComponent } from '../components/loader/loader.component';


@NgModule({
  declarations: [
    LoaderComponent,       
  ],
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
    QuillModule,
    LoaderComponent,      
  ],
  providers: [
    AuthService
  ]
})

export class SharedModule {}