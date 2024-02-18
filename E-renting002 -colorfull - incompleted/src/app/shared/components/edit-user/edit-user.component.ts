import { Component,Inject, OnInit } from '@angular/core';
import { SharedserviceService } from '../../services/sharedservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

interface  UserModel {

  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  role: string;
  contact:Number;
  totalRooms: Number;
  profilePicture: string;
  occupiedRooms: Number;

}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  submitted = false;

  editUserModel: UserModel;  /**variable que maneja la estructura de datos */
  editForm: FormGroup; //**editForm ---> FormGroup instance
  AddModel: any = {image:[]}; // image user
  param:any="";
  editUserDetails:any = JSON.parse( localStorage.getItem('editUser') || '{}')





  constructor(   private sharedService:SharedserviceService,
                 private route:Router,
                 private router:ActivatedRoute,
                 public fb: FormBuilder) { let id = this.router.snapshot.paramMap.get('id');
                 alert ("EStoy en edit-rent2, line 45,id-user:"+id);
                 this.router.queryParams.subscribe((params=>{
                   this.param = params['option']}))}



  ngOnInit(): void {

    // function to clean form view
    this.updateUserData();


    // get the UserId
    let id = this.router.snapshot.paramMap.get('id');
    alert ("EStoy en edit-user, line 56,id:"+id)


    // function to get user Data

    this.getUserData(id);

//**editForm ---> FormGroup instance
this.editForm = this.fb.group({

  firstName: new FormControl(this.editUserModel.firstName, [Validators.required,]),
  lastName: new FormControl(this.editUserModel.lastName, [Validators.required,]),
  email: new FormControl(this.editUserModel.email, [Validators.required,]),
  address: new FormControl(this.editUserModel.address, [Validators.required,]),
  password: new FormControl(this.editUserModel.password, [Validators.required,]),
  role: new FormControl(this.editUserModel.role, [Validators.required,]),
  contact: new FormControl(this.editUserModel.contact, [Validators.required,]),
  totalRooms: new FormControl(this.editUserModel.totalRooms, [Validators.required,]),
  occupiedRooms: new FormControl(this.editUserModel.occupiedRooms, [Validators.required,]),


  //image: new FormControl(this.AddModel.image),
})



}


// delete all field in form
updateUserData(){

  this.editForm = this.fb.group({

  firstName:['', [Validators.required]],
  lastName:['', [Validators.required]],
  email:['', [Validators.required]],
  address:['', [Validators.required]],
  password:['', [Validators.required]],
  role:['', [Validators.required]],
  contact:[0, [Validators.required]],
  totalRooms:[0, [Validators.required]],
  occupiedRooms:[0, [Validators.required]] });

};

// function getUserData

getUserData(id: string): void {this.sharedService.userProfile(id).subscribe({
  next: (data) => {

    alert ("Estoy en edit-user - line 111 - data['firstName']: "+data['firstName'])
    alert ("Estoy en edit-user - line 112 - data['lastName']: "+data['lastName'])
    alert ("Estoy en edit-user - line 113 - data['email']: "+data['email'])

    this.editForm.get('firstName').patchValue(data['firstName'],{onlySelf: true});
    this.editForm.get('lastName').patchValue(data['lastName'],{onlySelf: true});
    this.editForm.get('email').patchValue(data['email'],{onlySelf: true});
    this.editForm.get('address').patchValue(data['address'],{onlySelf: true});
    this.editForm.get('password').patchValue(data['password'],{onlySelf: true});
    this.editForm.get('role').patchValue(data['role'],{onlySelf: true});
    this.editForm.get('contact').patchValue(data['contact'],{onlySelf: true});
    this.editForm.get('totalRooms').patchValue(data['totalRooms'],{onlySelf: true});
    this.editForm.get('occupiedRooms').patchValue(data['occupiedRooms'],{onlySelf: true});

  },
  error: (e) => console.error(e)
});}

// Getter to access form control
get myForm() {return this.editForm.controls;}

getBase64 = (file: any) => new Promise(function (resolve: any, reject: any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error: any) => reject('Error:', error);})

  changeImg = (e: any) => {
  for(let image of e.target.files) {

  const file = image
  let encoded;
  this.getBase64(file)
    .then((result) => {
      encoded = result;
       //remove old legal images now upload new edited images

      console.log("@@@ ",this.editUserDetails.image,"called")
      this.editUserDetails.image.push(result)

    }).catch(e => console.log(e))}}

// function back

back(){const navigationExtra={queryParams:{option:'landlord'}}
               this.route.navigate(['/dashboard'],navigationExtra)}



 // funtion EditUser()

 EditUser(){

  this.submitted = true;

  if (!this.editForm.valid) {

    alert ("Estoy en editUser - line - 296 - !this.editForm.valid: "+!this.editForm.valid)
    for (const control of Object.keys(this.editForm.controls)) {
      this.editForm.controls[control].markAsTouched();
    }

    return false;
  } else {

    if (window.confirm('Are you sure?')) {
      let id = this.router.snapshot.paramMap.get('id');

      alert ("Estoy en editUser - line - 263")
      alert ("Estoy en editUser - line - 264 - id: "+id)
      alert ("Estoy en editUser - line - 265 - this.editForm.value: "+this.editForm.value['firstName'])

      this.sharedService.editUserDetails(id,this.editForm.value).subscribe({
        complete: () => {

          alert ("Estoy en editUser - line - 268 - servicio completado ... !")

          this.route.navigateByUrl('/dashboard');
          console.log('Content updated successfully!');
        },
        error: (e) => {
          console.log(e);
          alert ("Estoy en edit-rent -line 277 - hubo error")
        },});}}}



}
