import { Injectable, inject } from '@angular/core'
import { Admin } from '../access/admin '
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  ENDPOINT:string = 'http://localhost:3000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser:any = {}

  http =  inject(HttpClient)
  router = inject(Router)

  constructor() { }

  sigUp(user: Admin):Observable<any>
  {
    let api = `${this.ENDPOINT}/admin`;
    return this.http.post(api, user)
    .pipe(
      catchError(this.handleError)
    )
  }

  signIn(user: Admin)
  {
    return this.http.post<any>(`${this.ENDPOINT}/admin-login`, user)
    .subscribe((res:any)=>{

      console.log('signIn', res)
      localStorage.setItem('access-token', res.token)
      
      this.currentUser = res.user[0]
      this.currentUser['access-token'] = res.token 
      this.currentUser['auth'] = res.user
      this.router.navigate(['admin-profile'])

    })
  }

  getToken()
  {
    return localStorage.getItem('access-token')
  }

  get isLoggedIn():boolean
  {
    let authToken = localStorage.getItem('access-token')
    return authToken !== null ? true : false
  }

  doLogout()
  {
    let removeToken = localStorage.removeItem('access-token')
    if(removeToken === null)
    {
      this.router.navigate(['admin-login'])
    }
  }

  getUserProfile(id:any):Observable<any>
  {
    let api = `${this.ENDPOINT}/admin/${id}`
    return this.http.get(api, {headers: this.headers})
    .pipe(
      map((res)=>{
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  get CurrentUser()
  {
    return this.currentUser 
  }

  handleError(error: HttpErrorResponse)
  {
    let msg =   ''
    if(error.error instanceof ErrorEvent)
    {
      msg = error.error.message
    }else 
    {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`
    } 
    return throwError(msg)
  }

}
