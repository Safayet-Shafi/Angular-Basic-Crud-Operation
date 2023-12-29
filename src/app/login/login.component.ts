import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginValue!:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private http: HttpClient,
    private router :Router,) { }

  ngOnInit(): void {
    this.loginValue=this.formBuilder.group({
      email:[''],
      password:[''],
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      console.log(res);
      const user=res.find((a:any)=>{
        return a.email === this.loginValue.value.email &&  a.password === this.loginValue.value.password
      });
      if(user){
        alert("Login Successful");
        this.loginValue.reset();
        this.router.navigate(['dashboard'])
      }
      else{
        alert("User Not Found");
      }
    },err=>{
      alert("Server Error");
    })
  

  }

}
