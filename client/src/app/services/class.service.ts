import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class ClassService {

  constructor(private http: Http) {
    console.log("Classes Service connected ...") 
   }

   getClasses() {
     return this.http.get('http://localhost:3000/api/classes').map(res => res.json());
   }

   addClass(class_:Class) {
      var requestHeaders = new Headers();
      requestHeaders.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/class', JSON.stringify(class_), { headers: requestHeaders })
      .map(res => res.json());
   }

   updateClass(class_:Class) {
      var requestHeaders = new Headers();
      requestHeaders.append('Content-Type', 'application/json');
      return this.http.put('http://localhost:3000/api/class/' + class_._id, JSON.stringify(class_), { headers: requestHeaders })
      .map(res => res.json());
   }

   deleteClass(id:string) {
    return this.http.delete('http://localhost:3000/api/class/' + id)
    .map(res => res.json());
  }   
}

  export interface Class {
    _id: string,
    name: string,
    yearOfGraduation: number
  }
