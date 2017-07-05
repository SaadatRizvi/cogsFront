import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Projects} from './projects.dto';
import 'rxjs/add/operator/switchMap';

import {ProjectService} from './projects.service'
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  projects: Projects;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
   private localStorage: CoolLocalStorage
  ) {
  }


  ngOnInit(): void {
    this.projectService.getProjects(+this.localStorage.getItem('id'))
      .then(projects =>  this.projects=projects);

  }


}
