import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth-services/auth-service/auth.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm = new FormGroup({
    name:new FormControl(),
    email:new FormControl(),
    password:new FormControl(),
    confirmPassword:new FormControl(),
  })
  //signupForm: FormGroup|undefined;

  constructor(
    private service:AuthService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(){
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{validator: this.confirmationValidator})
  }

  private confirmationValidator(fg:FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    if (password != confirmPassword){
      fg.get('confirmPassword')?.setErrors({ passwordMismatch:true });
    }else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    console.log(this.signupForm.value);

    const signupRequest = {
      name: this.signupForm.value.name,
      password: this.signupForm.value.password,
      email: this.signupForm.value.email,
    };

    console.log(signupRequest);

    this.service.signup(signupRequest).subscribe((response) =>{
      console.log(response);

      if (response.id !+ null){
        this.snackBar.open(
          "You are registered successfully",
          'close',
          {duration:5000});
        this.router.navigateByUrl('/login');
      }else {
       this.snackBar.open(response.message,'Close',{duration:5000})
      }
    },(error:any)=>{
      this.snackBar.open("Registration Failed,Please try later","Close",{duration:50000})
    })
  }

}
