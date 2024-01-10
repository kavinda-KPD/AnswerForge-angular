import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth-services/auth-service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

  constructor(
    private service:AuthService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }


  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) =>{
      console.log(response);
    })
  }
}
