import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {
  
  formValue!:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.formValue=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      mobile:[''],
      email:[''],
      salary:[''],
    })
  }
  

}
