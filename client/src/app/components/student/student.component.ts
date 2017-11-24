import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { ClassService, Class } from '../../services/class.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  editMode:boolean;

  classId:String;
  students:Student[];
  currentStudent:Student;
  allClasses:Class[];

  constructor(private route:ActivatedRoute, private studentService:StudentService, private classService:ClassService) { 
    console.log('Student component constructor')
  }

  ngOnInit() {
    console.log('ngOnInit')
    
    this.classId = this.route.snapshot.params.classId;
    console.log('Class Id = ', this.route.snapshot.params.classId);
    this.refreshStudents(this.classId);

    this.classService.getClasses().subscribe((classes) => {
      console.log(this.allClasses);
      this.allClasses = classes;
    });
  }

  onAddBtnClick() {

    console.log(this.allClasses);
    this.currentStudent = {
      _id: "",
      classid:this.classId,
      firstname:"",
      lastName:""
    };
    this.editMode = true;
  }

  onCancelBtnClick() {
    this.currentStudent = null;
    this.editMode = false;
    this.refreshStudents(this.classId);
  }

  onEditBtnClick(student:Student) {
    this.currentStudent = student;
    this.editMode = true;
  }

  onDeleteBtnClick(student:Student) {
    this.studentService.deleteStudent(student._id).subscribe(res => {
      this.refreshStudents(this.classId);
    });
  }

  onSaveBtnClick() {
    if(this.currentStudent._id == "")  {
      this.studentService.addStuden(this.currentStudent).subscribe(student => {
        this.currentStudent = null;
        this.editMode = false;
        this.refreshStudents(this.classId);
      });
    }
    else {
      this.studentService.updateStudent(this.currentStudent).subscribe(class_ => {
        this.currentStudent = null;
        this.editMode = false;
        this.refreshStudents(this.classId);
      });
    }
  }


  getClasses(){
    return this.getClasses();
  }

  refreshStudents(classId:String){
    console.log('Class Id = ', classId);
    console.log('This Class Id = ', this.classId);
    this.studentService.getStudents(classId).subscribe((students) => {
      console.log(students);
      this.students = students;
    });
  }
}
