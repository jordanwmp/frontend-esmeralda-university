import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signForm!:FormGroup;

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
    this.signForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login()
  {
    this.auth.signIn(this.signForm.value)
  }

}
