import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Projects} from './projects.dto';
import 'rxjs/add/operator/switchMap';

import {ProjectService} from './projects.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {formErrors, isDisabled, ProjectsValidator, validationMessages} from "./projects.validator";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  projectsValidator: any;
  projects: Projects[];
  temp: Projects;
  isEditEnabled: boolean;
  isAddEnabled: boolean;
  validationMessages: any;
  formErrors: any;
  updateError: string;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
   private localStorage: CoolLocalStorage
  ) {
    this.formErrors=formErrors;
    this.validationMessages=validationMessages;
    this.projectsValidator=new ProjectsValidator();
  }


  ngOnInit(): void {
    this.projectService.getProjects(+this.localStorage.getItem('id'))
      .then(projects =>  this.projects=projects);

  }

  isDisabled(): boolean{
    return isDisabled;
  }

  resetTemp(): void{
    this.temp = new Projects();
  }

  enableEdit(index: number): void{
    this.temp=Object.assign({},this.projects[index]);
    this.isEditEnabled = true;
  }

  disableEdit(): void{
    this.isEditEnabled=false;
    this.temp = new Projects();
  }

  enableAdd(): void {
    this.temp = new Projects();
    this.isEditEnabled = false;
    this.isAddEnabled = true;

  }

  disableAdd(): void {
    this.isAddEnabled = false;
    this.resetTemp();
  }
  update(): void{
    let newData = Object.assign({}, this.temp);
    debugger;
    console.log(newData);
    let id=this.temp.id;
    this.projectService.update(newData)
      .then(res=> {
        if (res == 1) {
          for (let i = 0; i < this.projects.length; i++) {
            // console.log("for i= "+i);
            // console.log("this.addresses[i].id= "+this.addresses[i].id);
            console.log("this.tempEd= "+this.temp);
            if (this.projects[i].id === id) {

              this.projects[i] = this.temp;
              console.log(this.temp)

            }
          }
        }
      }).then(()=>{
      this.temp = new Projects();
      this.isEditEnabled = false;
    });

  }
  add(): void {
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')}, this.temp);

    this.projectService.create(newData)
      .then(res => {

        if (!res.message) {
          console.log(res);
          this.projects.push(res);
          this.disableAdd();
        }
        else{
          this.updateError=res.Message;
        }
      });
  }

  delete(index: number):void{
    let id= this.projects[index].id;
    console.log(id)
    this.temp=this.projects[index];
    this.projectService.delete(id)
      .then(res=>{
        if(res.message === "done") {
          console.log("After Delete: ");
          console.log(res);
          //delete this.addresses[index];
          this.projects = this.projects.filter(h => h !== this.temp);
          this.resetTemp();
        }
      })

  }

  projectForm: NgForm;
  @ViewChild('projectForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.projectForm) {
      return;
    }
    this.projectForm = this.currentForm;
    if (this.projectForm) {
      this.projectForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.projectForm) {
      return;
    }
    const form = this.projectForm.form;
    this.projectsValidator.setDisabled();

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);


      let errors = [];

      let validatonCheck: boolean;

      if (field === 'leavingDate') {
        validatonCheck = !this.projectsValidator.validate(field, errors, this.temp[field],this.temp.joiningDate);
      }
      else {
        validatonCheck = !this.projectsValidator.validate(field, errors, this.temp[field])

      }



      if ((control && control.dirty && !control.valid) || (control && validatonCheck)) {
        const messages = this.validationMessages[field];
        if (control.errors) {
          errors.push(control.errors);
        }
        for (const key of errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
