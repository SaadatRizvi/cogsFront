import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Education} from './education.dto';
import {EducationService} from './education.service';

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
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.educationService.getEducation(+params.get('id')))
      .subscribe(education => this.education = education);
  }

}
