import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUpModel } from './model/signup-model';
import { EmployeeDashboardApiService } from '../api/employee-dashboard-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupValue!:FormGroup;
  signUpModelObj : SignUpModel=new SignUpModel();

  constructor(private formBuilder:FormBuilder,
    private http: HttpClient,
    private router :Router,
    private employeeApiService:EmployeeDashboardApiService) { }

  ngOnInit(): void {
    this.signupValue=this.formBuilder.group({
      fullName:['',Validators.required],
      mobile:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }


  postSignUp(){
    this.signUpModelObj.fullName=this.signupValue.value.fullName;
    this.signUpModelObj.mobile=this.signupValue.value.mobile;
    this.signUpModelObj.email=this.signupValue.value.email;
    this.signUpModelObj.password=this.signupValue.value.password;
    console.log(this.signUpModelObj);
    this.employeeApiService.postSignUp(this.signUpModelObj)
    
    .subscribe(res=>{
       console.log(res);
      alert("Register SuccessFull")
      this.signupValue.reset();
      this.router.navigate(['login'])
      
    },
    err=>{
      alert("Internal Server Error")
    }
    )
  }

//   signUp(){
//   this.http.post<any>("http://localhost:3000/signupUsers",this.signupValue.value)
//   .subscribe(res=>{
//     alert("Signup SuccessFul")
//     this.signupValue.reset();
//     this.router.navigate(['login'])
//   },err=>{
//     alert("Srver Error")
//   }) 
// }

}
