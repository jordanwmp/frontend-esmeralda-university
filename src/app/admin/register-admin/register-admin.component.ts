import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  signupForm!:FormGroup;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm()
  {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  registerUser()
  {
    const value = this.signupForm.value;
    value['level'] = 0
    this.auth.sigUp(value)
    .subscribe((res)=>{
      console.log('res from api ', res);
      if(res)
      {
        this.signupForm.reset()
        this.router.navigate(['/admin-login'])
      }
    })
  }

}
