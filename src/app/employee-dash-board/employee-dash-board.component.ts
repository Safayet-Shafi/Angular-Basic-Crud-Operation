import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './model/employee-dashboard-model';
import { EmployeeDashboardApiService } from '../api/employee-dashboard-api.service';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {
  employeeModelObj : EmployeeModel=new EmployeeModel();
  formValue!:FormGroup;
  employeeData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder:FormBuilder,
              private employeeApiService:EmployeeDashboardApiService) { }

  ngOnInit(): void {
    
    this.getEmployee();
    this.formValue=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      mobile:[''],
      email:[''],
      salary:[''],
    })
  }

  addEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployee(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.employeeApiService.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Data Added")
      this.formValue.reset();
      let ref=document.getElementById("close")
      ref?.click();
      this.getEmployee();
    },
    err=>{
      alert("Failed")
    }
    )
  }


  getEmployee(){
    this.employeeApiService.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployee(row:any){
    this.employeeApiService.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Data Deleted")
      this.getEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployee(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.employeeApiService.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Data Updated Successfully");
      this.formValue.reset();
      let ref=document.getElementById("close")
      ref?.click();
      this.getEmployee();
    })
      

  }

}
