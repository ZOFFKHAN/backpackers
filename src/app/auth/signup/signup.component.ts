import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string ;



  constructor(private formBuider: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm(){
    this.signUpForm=this.formBuider.group( {
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
   
  });
}
onSubmit() {
  const email = this.signUpForm.get('email').value;
  const password = this.signUpForm.get('password').value;

  this.authService.createNewUser(email, password).then(
    () => {
      this.router.navigate(['/image','list']); 
    },
    (error) => {
      this.errorMessage= error;
      
    }
  );
}
}

