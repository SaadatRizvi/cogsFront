import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Education} from './education.dto';
import {EducationService} from './education.service';
import {CoolLocalStorage} from "angular2-cool-storage";
import {NgForm} from "@angular/forms";
import {formErrors} from './education.validator';
import {validationMessages} from './education.validator';
import {EducationValidator} from './education.validator';
import {isDisabled} from './education.validator';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  providers: [ EducationService ]
})

export class EducationComponent implements OnInit {

  educations: Education[];
  isEditEnabled: boolean;
  isAddEnabled: boolean;
  tempEducation: Education;
  formErrors: any;
  validationMessages: any;
  educationValidator: EducationValidator;
  updateError: string;
  date:any;
  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {
    this.formErrors=formErrors;
    this.validationMessages=validationMessages;
    this.educationValidator=new EducationValidator();
  }

  ngOnInit() {
    this.educationService.getEducation(+this.localStorage.getItem('id'))
      .then(education =>  this.educations=education);
  }

  isDisabled(): boolean{
    return isDisabled;
  }

  resetTemp(): void{
    this.tempEducation = new Education();
  }

  enableEdit(index: number): void{
    this.disableAdd();
    this.tempEducation=Object.assign({},this.educations[index]);
    this.isEditEnabled = true;
  }

  disableEdit(): void{
    this.isEditEnabled=false;
    this.tempEducation = new Education();
  }

  enableAdd(): void {
    this.tempEducation = new Education();
    this.isEditEnabled = false;
    this.isAddEnabled = true;

  }

  disableAdd(): void {
    this.isAddEnabled = false;
    this.resetTemp();
  }
  update(): void{
    let gpa=this.tempEducation.gpa;
    //delete this.tempEducation.gpa;
    let newData = Object.assign({}, this.tempEducation);
    newData.gpa=gpa;
    let id=this.tempEducation.id;
    this.educationService.update(newData)
      .then(res=> {
        if (res == 1) {
          for (let i = 0; i < this.educations.length; i++) {
            if (this.educations[i].id === id) {

              this.educations[i] = this.tempEducation;
              this.educations[i].gpa=gpa;
            }
          }
        }
      }).then(()=>{
      this.tempEducation = new Education();
      this.isEditEnabled = false;
    });

  }
  add(): void {
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')}, this.tempEducation);

    //this.address.push(this.tempAddress)

    this.educationService.create(newData)
      .then(res => {
        // console.log('res; ');
        //
        // console.log(res);
        if (!res.message) {
          console.log(res);
          this.educations.push(res);
          this.disableAdd();
        }
        else{
          this.updateError=res.message;
        }
      });
  }

  delete(index: number):void{
    let id= this.educations[index].id;
    this.tempEducation=this.educations[index];
    this.educationService.delete(id)
      .then(res=>{
        if(res.message === "done") {
          this.educations = this.educations.filter(h => h !== this.tempEducation);
          this.resetTemp();
        }
      })

  }

  educationForm: NgForm;
  @ViewChild('educationForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.educationForm) {
      return;
    }
    this.educationForm = this.currentForm;
    if (this.educationForm) {
      this.educationForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.educationForm) {
      return;
    }
    const form = this.educationForm.form;
    this.educationValidator.setDisabled();

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);


      let errors = [];

      if ((control && control.dirty && !control.valid) || (control && !this.educationValidator.validate(field, errors,this.tempEducation[field]))) {
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
