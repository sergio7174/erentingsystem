import { Component, OnInit, ViewChild , Input} from '@angular/core';
// ,AfterViewChecked,ElementRef
//import { MatSidenav } from '@angular/material/sidenav';
//import { SidenavService } from '../services/sidenav.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ThisReceiver } from '@angular/compiler';
import { DataService } from 'src/app/data.service';
// import { ListRentDetailsComponent } from 'src/app/modules/landlord/components/list-rent-details/list-rent-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedserviceService } from '../../shared/services/sharedservice.service';

//import { ChangePasswordComponent } from './change-password/change-password.component';
//import { EditUserComponent } from './edit-user/edit-user.component';
// import { MyBookingsComponent } from '../my-bookings/my-bookings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetails:any = JSON.parse(localStorage.getItem('userId')|| '{}');

  role=this.userDetails.role
  notificationCount:any={}
  notify:any=[]



  profilePicture:any;

  //userDetails:any={};
//profilePicture:any;
firstName:any;
lastName:any;
dashboard:boolean=false
isAdmin:boolean=false
dataLoaded:boolean=false
 //query param passed in order avoid two nav bars in admin dashboard
  navigationExtra={
  queryParams:{
    setNavBar:true
  }
}

 //@ViewChild('sidenav') public sidenav!: MatSidenav;

 constructor( private router: Router,
              private data:DataService,
              public dialog:MatDialog,
              private sharedService:SharedserviceService,
              private _sanitizer: DomSanitizer,
              private  SharedServiceService: SharedserviceService,
              public route: ActivatedRoute)


  {console.log("login cred!!!!!! ",this.userDetails)}
  ngOnInit():void
 {
   this.getProfileDetails()
   this.dashboardValue()
   this.notification()

 }
  rentList(){

    const roleDetails = JSON.parse(localStorage.getItem('userId') || '{}')
    console.log('rentlistdetails',roleDetails)
   if(roleDetails?.role=='Tenant')
   {
     const navigationExtra={
       queryParams:{
         option:'Tenant'


       }

     }

     this.router.navigate(['/rent-details-list'],navigationExtra)

   }
   if(roleDetails.role=='landlord')
   {
     {
       const navigationExtra={
         queryParams:{
           option:'landlord'

         }
       }


       this.router.navigate(['/rent-details-list'],navigationExtra)

     }
   }

 }
 home(){
   this.router.navigate(['/home'])
 }

 myBookings(){
   console.log("booking called")
   this.router.navigate(['/my-bookings'])
   // this.router.navigate(MyBookingsComponent)
 }


 RentDetails()
 //navigation extra passed bkz other wise navbar was comming twice in admin dashboard
 {this.router.navigate(['/rentlist2'],this.navigationExtra)}

 editUser()

 //navigation extra passed bkz other wise navbar was comming twice in admin dashboard
{
  //localStorage.setItem('editUser',JSON.stringify(IdUser));
  const IdUser = JSON.parse(localStorage.getItem('userId') || '{}');

  alert ("Estoy en navbar Component - line 125 - IdUser:"+ IdUser['_id'])
  this.router.navigate(['/editUser',IdUser['_id']])}

 changePassword()
 //navigation extra passed bkz other wise navbar was comming twice in admin dashboard
 {this.router.navigate(['/changePassword'],this.navigationExtra)}




 listLandlord(){
    //navigation extra passed bkz other wise navbar was comming twice in admin dashboard
   this.router.navigate(['/landlordlist'],this.navigationExtra)
 }



 /*ngAfterViewInit(): void {
   this.sidenavService.setSidenav(this.sidenav);
 }*/

 ngAfterViewChecked():void
 {
   this.userDetails=(this.data.getUserData());
   {
   console.log(this.userDetails);
   }
 }

 /*changePasswordDialog(){
       this.dialog.open(ChangePasswordComponent)
 }*/

 getProfileDetails(){
  this.sharedService.getProfileDetails().subscribe((res:any) => {
     console.log('response of profile',res)

     res.forEach((obj:any)=>{

         this.firstName=obj.firstName;
         this.lastName=obj.lastName;

         if(obj.profilePicture)
         this.profilePicture=this._sanitizer.bypassSecurityTrustResourceUrl(`${obj.profilePicture}`)
         else
         this.profilePicture='assets/profile.jpg'
       })

 },(error:any)=> {
   console.log(error)

 }, () => {

 })

}

dashboardValue(){
 const {role} = JSON.parse(localStorage.getItem('userId') || '{}')
 if(role== 'admin' ){
   this.dashboard= true
   this.isAdmin=true
   console.log('isadmin',this.isAdmin)
   console.log('dasboard',this.dashboard)
 }
 else if(role=='landlord'){
   this.dashboard=true
 }
}

redirectDashboard()
{
 const {role} = JSON.parse(localStorage.getItem('userId') || '{}')
if(role == 'admin')
{
 this.router.navigate(['/admindashboard'])
}
else{
 this.router.navigate(['/dashboard'])
}

}









logOut(){
 localStorage.clear();
 // Swal.fire('local storage cleared')
 this.router.navigate(['/login'])
}
notification(){
 this. SharedServiceService.notification().subscribe((res) => {

   console.log('notification',res)
   this.notify=res
   // console.log('notify',this.notify[0].notification)
  this.notificationCount=Object.keys(res).length
 }, error => {
   console.log(error)

 }, () => {

 })
}
getDropDown(value:any){
 console.log(value)
 localStorage.setItem('bookingInfo',JSON.stringify(value))
 this.router.navigate(['/notification-dialog'])
 // console.log('abc')
}



}
