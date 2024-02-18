import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RentService } from '../../services/rent.service';

import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

/*****estructura de los datos */

interface  AddModel {

  street: string;
  city: string;
  state: string;
  roomNo: number;
  district: string;
  landmark: string;
  roomTypes:string;}





@Component({
  selector: 'app-add-rent2',
  templateUrl: './add-rent2.component.html',
  styleUrls: ['./add-rent2.component.css']
})
export class AddRent2Component implements OnInit {

  reactiveForm!: FormGroup;
  addModelRent: AddModel;  /**variable que maneja la estructura de datos */
  AddModel: any = {legalDocuments:[],image:[]};


  user: any = {};


  constructor(private Rentservice: RentService,private route: Router)
                              {this.addModelRent = {} as AddModel}

  ngOnInit(): void {

    // driving the reactiveform
    this.reactiveForm = new FormGroup({

      street: new FormControl(this.addModelRent.street, [Validators.required,]),
      city: new FormControl(this.addModelRent.city, [Validators.required,]),
      state: new FormControl(this.addModelRent.state, [Validators.required,]),
      roomNo: new FormControl(this.addModelRent.roomNo, [Validators.required,]),
      district: new FormControl(this.addModelRent.district, [Validators.required,]),
      landmark: new FormControl(this.addModelRent.landmark, [Validators.required,]),
      roomTypes: new FormControl(this.addModelRent.roomTypes, [Validators.required,]),
      legalDocuments: new FormControl(this.AddModel.legalDocuments),
      image: new FormControl(this.AddModel.image),})

         }

get street() {return this.reactiveForm.get('street')!;} /**function to get streetName */
get city() {return this.reactiveForm.get('city')!;} /**function to get city */
get state() {return this.reactiveForm.get('state')!;} /**function to get state */
get roomNo() {return this.reactiveForm.get('roomNo')!;} /**function to get roomNo */
get district() {return this.reactiveForm.get('district')!;} /**function to get district */
get landmark() {return this.reactiveForm.get('landmark')!;} /**function to get landmark */
get roomTypes() {return this.reactiveForm.get('roomTypes')!;} /**function to get roomType */



  navigationExtra = {queryParams: {option: 'landlord'}}

  back() {this.route.navigate(['/rent-details-list'], this.navigationExtra)}

  Addroom() {
 /*****************adding by me ******************* */
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.AddModel = this.reactiveForm.value; /** se igualan los valores del objeto y los datos obtenidos */


    console.info('streetName:', this.AddModel.street);
    console.info('city:', this.AddModel.city);
    console.info('state:', this.AddModel.state);
    console.info('Room No:', this.AddModel.roomNo);
    console.info('District:', this.AddModel.district);
    console.info('LandMark:', this.AddModel.landmark);
    console.info('Room Types:', this.AddModel.roomTypes);


/*****************end block added by me ******************* */

    console.log(this.AddModel)
    this.user = JSON.parse(localStorage.getItem('userId') || '{}')
    this.AddModel['landLordId'] = this.user._id



    this.Rentservice.Addroom(this.AddModel).subscribe((res) => {

      Swal.fire('Rent details added successfully')
      console.log(res)
    }, error => {
      console.log(error)

    }, () => {

    })
    console.log(this.AddModel)

    // this.router.navigate(['/'],navigationExtra)
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.onSameUrlNavigation = 'reload';
    // this.route.navigate(['rent-details-list'], this.navigationExtra);


    this.route.navigate(['/rent-details-list'], this.navigationExtra)
  }


  getBase64 = (file: any) => new Promise(function (resolve: any, reject: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error: any) => reject('Error:', error);
  })

  changeImg = (e: any) => {
    for(let image of e.target.files) {

    const file = image
    let encoded;
    this.getBase64(file)
      .then((result) => {
        encoded = result;
        this.AddModel.image.push(result)

      })
      .catch(e => console.log(e))
  }
}
changelegaldoc = (e: any) => {
    for(let image of e.target.files) {

    const file = image
    let encoded;
    this.getBase64(file)
      .then((result) => {
        encoded = result;
        this.AddModel.legalDocuments.push(result)

      })
      .catch(e => console.log(e))
  }
}

}



