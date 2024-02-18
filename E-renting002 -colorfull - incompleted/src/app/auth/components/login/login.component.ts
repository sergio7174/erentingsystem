// Oninit cause - use the service to the component
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
/** have to install it - npm install sweetalert2 */
/****A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for
 * JavaScript's popup boxes */
import Swal from 'sweetalert2';
/**********login service file ******/
import { DataService } from 'src/app/data.service';









@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authModel: any = {};
  userDetails:any={}

  // authService: AuthService - Http connection to Server - throw backend server

  constructor(    private authService: AuthService // clase containing login service
                 ,private router:Router,private data:DataService) { }
  ngOnInit(): void {}

    // login function
    login() {

      // service promise to get data fom the post login view(form)
      this.authService.login(this.authModel).subscribe((res:any) => {
      console.log(res)
      // userDetail = (doc) got it from server

      this.userDetails=res.user
      console.log ("This userDetails: "+ this.userDetails);

      // localStorage save data got it from Server
      // got userId and token from cookie got it from Server
      localStorage.setItem('userId', JSON.stringify(this.userDetails))
      localStorage.setItem('token',this.userDetails.token)

        this.data.setUserData(this.userDetails)

     if(this.userDetails?.role == 'admin')
             {this.router.navigate(['/admindashboard'])}

    if(this.userDetails?.role=='Tenant')

    {const navigationExtra={queryParams:{option:'Tenant'}}
       this.router.navigate(['/rent-details-list'],navigationExtra)}

    if(this.userDetails?.role=='landlord')

         console.log("userDetails?.role: , estoy en landlord")

    {{const navigationExtra={queryParams:{ option:'landlord'}}

        this.router.navigate(['/dashboard'])}}



           },error=>{Swal.fire(error.error.message)},()=>{})} /***end login function */

          }
