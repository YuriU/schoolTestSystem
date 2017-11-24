import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class StudentService {

  constructor(private http: Http) {
    console.log("Student Service connected ...") 
   }

  getStudents(classId:String) {
    return this.http.get('http://localhost:3000/api/students/class/'+classId).map(res => res.json());
  }

  addStuden(student:Student) {
    var requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/student', JSON.stringify(student), { headers: requestHeaders })
    .map(res => res.json());
 }

 updateStudent(student:Student) {
    var requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/student/' + student._id, JSON.stringify(student), { headers: requestHeaders })
    .map(res => res.json());
 }

 deleteStudent(id:String) {
  return this.http.delete('http://localhost:3000/api/student/' + id)
  .map(res => res.json());
 }   
}

export interface Student {
  _id: String,
  classid:String;
  firstname:String;
  lastName:String;
}
