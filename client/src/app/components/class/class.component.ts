import { Component, OnInit } from '@angular/core';
import { ClassService, Class } from '../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classes: Class[];
  currentClass: Class;
  editMode:boolean;
  
  constructor(private classService:ClassService) { 
    this.refreshClasses();
  }

  ngOnInit() {
  }

  onAddBtnClick() {
    this.editMode = true;
    this.currentClass = {
      _id: "",
      name:"",
      yearOfGraduation:0
    }
  }

  onEditBtnClick(class_:Class) {
    this.currentClass = class_;
    this.editMode = true;
  }

  onDeleteBtnClick(class_:Class) {
    this.classService.deleteClass(class_._id).subscribe(res => {
      this.refreshClasses();
    });
  }

  onSaveBtnClick() {
    if(this.currentClass._id == "")  {
      this.classService.addClass(this.currentClass).subscribe(class_ => {
        this.currentClass = null;
        this.editMode = false;
        this.refreshClasses();
      });
    }
    else {
      this.classService.updateClass(this.currentClass).subscribe(class_ => {
        this.currentClass = null;
        this.editMode = false;
        this.refreshClasses();
      });
    }
  }

  onCancelBtnClick() {
    this.currentClass = null;
    this.editMode = false;
    this.refreshClasses();
  }

  refreshClasses(){
    this.classService.getClasses().subscribe((classes) => {
      console.log(classes);
      this.classes = classes;
    });
  }
}
