import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RentService } from '../../services/rent.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



interface  AddModel {

  street: string;
  city: string;
  state: string;
  roomNo: number;
  district: string;
  landmark: string;
  roomTypes:string;}


@Component({
  selector: 'app-edit-rent2',
  templateUrl: './edit-rent2.component.html',
  styleUrls: ['./edit-rent2.component.css']
})
export class EditRent2Component implements OnInit {


  submitted = false;

  addModelRent: AddModel;  /**variable que maneja la estructura de datos */
  editForm : FormGroup; //**editForm ---> FormGroup instance


  AddModel: any = {legalDocuments:[],image:[]};
  param:any="";

  editRoomDetails:any = JSON.parse( localStorage.getItem('editRoom') || '{}')

  constructor(   private route:Router,
                 private RentService: RentService,
                 private router:ActivatedRoute,
                 public fb: FormBuilder,


                 )


                 {let id = this.router.snapshot.paramMap.get('id');
                  alert ("EStoy en edit-rent2, line 48,id-rent:"+id);
                  this.router.queryParams.subscribe((params=>{
                    this.param = params['option'];
                  }))
                 }

  ngOnInit(): void {



    this.updateRentData();

    let id = this.router.snapshot.paramMap.get('id');
    alert ("EStoy en edit-rent2, line 60,id-rent:"+id)


    this.getRentData(id);

   this.editForm = this.fb.group({

      street:['street', [Validators.required]],
      city:['', [Validators.required]],
      state: ['', [Validators.required]],
      roomNo: ['', [Validators.required]],
      district: ['district', [Validators.required]],
      landmark: ['', [Validators.required]],
      roomTypes: ['', [Validators.required]],
})



   //clear old image and legal doc , so we can add new images and legal docs
   //this.editRoomDetails.image=[]
   //this.editRoomDetails.legalDocuments=[]

   //**editForm ---> FormGroup instance
 this.editForm = this.fb.group({

   street: new FormControl(this.addModelRent.street, [Validators.required,]),
   city: new FormControl(this.addModelRent.city, [Validators.required,]),
   state: new FormControl(this.addModelRent.state, [Validators.required,]),
   roomNo: new FormControl(this.addModelRent.roomNo, [Validators.required,]),
   district: new FormControl(this.addModelRent.district, [Validators.required,]),
   //landmark: new FormControl(this.addModelRent.landmark, [Validators.required,]),
   roomTypes: new FormControl(this.addModelRent.roomTypes, [Validators.required,]),
   //legalDocuments: new FormControl(this.AddModel.legalDocuments),
   //image: new FormControl(this.AddModel.image),
 })



 }

 getRentData(id: string): void {this.RentService.getRentData(id).subscribe({
  next: (data) => {


    this.editForm.get('street').patchValue(data['street'],{onlySelf: true});
    this.editForm.get('city').patchValue(data['city'],{onlySelf: true});
    this.editForm.get('state').patchValue(data['state'],{onlySelf: true});
    this.editForm.get('district').patchValue(data['district'],{onlySelf: true});
    this.editForm.get('roomNo').patchValue(data['roomNo'],{onlySelf: true});
    //this.editForm.get('landmark').patchValue(data['landmark'],{onlySelf: true});
    this.editForm.get('roomTypes').patchValue(data['roomTypes'],{onlySelf: true});
  },
  error: (e) => console.error(e)
});}




//  this is another way to get the data,
     /* this.editForm.patchValue({

      street: doc['street'],
      city: doc['city'],
      state: doc['state'],
      roomNo: doc['roomNo'],
      district: doc['district'],
      landmark: doc['landmark'],
      roomTypes: doc['roomTypes'],
})*/;


// delete all field in form
updateRentData(){

  this.editForm = this.fb.group({
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    roomNo: ['', [Validators.required]],
    district: ['', [Validators.required]],
    //landmark: ['', [Validators.required]],
    roomTypes: ['', [Validators.required]],

  });
};





// Getter to access form control
get myForm() {
return this.editForm.controls;
}








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

    console.log("@@@ ",this.editRoomDetails.image,"called")
    this.editRoomDetails.image.push(result)

  }).catch(e => console.log(e))}}

changelegaldoc = (e: any) => {
for(let image of e.target.files) {

const file = image
let encoded;
this.getBase64(file)
  .then((result) => {
    encoded = result;
    //remove old legal docs now upload new edited docs

    this.editRoomDetails.legalDocuments.push(result)}).catch(e => console.log(e))}}


back(){const navigationExtra={queryParams:{option:'landlord'}}
               this.route.navigate(['/rent-details-list'],navigationExtra)}

Editroom(){

                this.submitted = true;

                if (!this.editForm.valid) {

                  alert ("Estoy en EditRoom - line - 296 - !this.editForm.valid: "+!this.editForm.valid)
                  for (const control of Object.keys(this.editForm.controls)) {
                    this.editForm.controls[control].markAsTouched();
                  }

                  return false;
                } else {

                  if (window.confirm('Are you sure?')) {
                    let id = this.router.snapshot.paramMap.get('id');

                    alert ("Estoy en EditRoom - line - 263")
                    alert ("Estoy en EditRoom - line - 264 - id: "+id)
                    alert ("Estoy en EditRoom - line - 265 - this.editForm.value: "+this.editForm.value['street'])

                    this.RentService.updateRentDetails(id, this.editForm.value).subscribe({
                      complete: () => {

                        alert ("Estoy en EditRoom - line - 268 - servicio completado ... !")

                        this.route.navigateByUrl('/rent-details-list');
                        console.log('Content updated successfully!');
                      },
                      error: (e) => {
                        console.log(e);
                        alert ("Estoy en edit-rent -line 277 - hubo error")
                      },});}}}








              }

