import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Education} from './education.dto';
import {EducationService} from './education.service';
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  providers: [ EducationService ]
})

export class EducationComponent implements OnInit {

  education: Education;

  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {
  }

  ngOnInit() {
    this.educationService.getEducation(+this.localStorage.getItem('id'))
      .then(education =>  this.education=education);
  }

}
