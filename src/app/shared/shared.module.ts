import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthService } from './auth.service';
import { LoaderComponent } from '../components/loader/loader.component';
import {SortingPipe} from './sorting.pipe';


@NgModule({
  declarations: [
    LoaderComponent,
    SortingPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    LoaderComponent,
    SortingPipe
  ],
  providers: [
    AuthService
  ]
})

export class SharedModule {}
