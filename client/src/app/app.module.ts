import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes, RouterLink } from '@angular/router';


import { AppComponent } from './app.component';
import { ClassComponent } from './components/class/class.component';
import { ClassService } from './services/class.service';
import { StudentComponent } from './components/student/student.component';
import { StudentService } from './services/student.service';

const appRoutes: Routes = [
  { path: '', component:ClassComponent},
  //{ path: 'students', component:StudentComponent}
  { path: 'students/:classId', component:StudentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClassComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ClassService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
