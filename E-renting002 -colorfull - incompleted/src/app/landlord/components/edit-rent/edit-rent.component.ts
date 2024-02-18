import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RentService } from '../../services/rent.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

/*****estructura de los datos */

interface  AddModel {

  street: string;
  city: string;
  state: string;
  roomNo: number;
  district: string;
  landmark: string;
  roomTypes:number;}

@Component({
  selector: 'app-edit-rent',
  templateUrl: './edit-rent.component.html',
  styleUrls: ['./edit-rent.component.css']
})
export class EditRentComponent implements OnInit {

  userDetails1 = JSON.parse(localStorage.getItem('userId') || '{}')
  submitted = false;

  addModelRent: AddModel;  /**variable que maneja la estructura de datos */

  editForm: FormGroup; //**editForm ---> FormGroup instance

  RentData: []; //*** employeeData -- array instance


  AddModel: any = {legalDocuments:[],image:[]};


  user: any = {};
  param:any=""
  userDetails:any={}

  constructor
  ( private route:Router,
    private RentService: RentService,
    private router:ActivatedRoute,
    public fb: FormBuilder,) {
    {this.addModelRent = {} as AddModel};
    this.router.queryParams.subscribe((params=>{
      this.param = params['option'];
    }))
  }




  ngOnInit(): void {

     this.updateRentData();
     let dataUser = JSON.parse(localStorage.getItem('userId') || '{}')
     //let id = this.router.snapshot.paramMap.get('id');
    alert("Estoy en edit-rent - line 60, dataUser._id: "+dataUser._id)


     this.getRentData(dataUser._id);



     //**editForm ---> FormGroup instance
  this.editForm = this.fb.group({

       street: new FormControl(this.addModelRent.street, [Validators.required,]),
       city: new FormControl(this.addModelRent.city, [Validators.required,]),
       state: new FormControl(this.addModelRent.state, [Validators.required,]),
       roomNo: new FormControl(this.addModelRent.roomNo, [Validators.required,]),
       district: new FormControl(this.addModelRent.district, [Validators.required,]),
       landmark: new FormControl(this.addModelRent.landmark, [Validators.required,]),
       roomTypes: new FormControl(this.addModelRent.roomTypes, [Validators.required,]),
       legalDocuments: new FormControl(this.AddModel.legalDocuments),
       image: new FormControl(this.AddModel.image),
     })

     //clear old image and legal doc , so we can add new images and legal docs
     this.AddModel.image=[]
     this.AddModel.legalDocuments=[]

     }



// Getter to access form control
get myForm() {
  return this.editForm.controls;
}

getRentData(id) {
  alert ("Estoy en edit-rent, line 95, id: "+ id)
 // this.RentService.getRentData(id).subscribe((data) => {
  this.RentService. getRentData(id).subscribe((data) => {


    alert ('EStoy en edit-rent, line 100, data:'+data);
    alert ('EStoy en edit-rent, line 101, data[street]:'+data['street']);
    this.editForm.setValue({
      street: data['street'],
      city: data['city'],
      state: data['state'],
      roomNo: data['roomNo'],
      district: data['district'],
      landmark: data['landmark'],
      roomTypes: data['roomTypes'],
});


}


);}

updateRentData(){

  this.editForm = this.fb.group({
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    roomNo: ['', [Validators.required]],
    district: ['', [Validators.required]],
    landmark: ['', [Validators.required]],
    roomTypes: ['', [Validators.required]],

  });
};


    Editroom(){

      if (this.editForm.invalid) {
        for (const control of Object.keys(this.editForm.controls)) {
          this.editForm.controls[control].markAsTouched();
        }
        return;
      }
     // this.AddModel = this.editForm.value; /** se igualan los valores del objeto y los datos obtenidos */


      this.submitted = true;
      if (!this.editForm.valid) {
        return false;
      } else {
        if (window.confirm('Are you sure?')) {
          let id = this.router.snapshot.paramMap.get('id');
          this.RentService.updateRentDetails(id, this.editForm.value).subscribe({
            complete: () => {

              if(this.userDetails?.role=='Tenant')
              {
                const navigationExtra={
                  queryParams:{
                    option:'Tenant'}}

                this.route.navigate(['/add-rent2'],navigationExtra)

              }
              if(this.userDetails?.role=='landlord')
              {
                {const navigationExtra={queryParams:{option:'landlord'}}


                  this.route.navigate(['/add-rent2'],navigationExtra)

                }
              /*this.router.navigateByUrl('/employees-list');
              console.log('Content updated successfully!');*/
            }
          }});
        }
      }
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
         //remove old legal images now upload new edited images

        console.log("@@@ ",this.AddModel.image,"called")
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
        //remove old legal docs now upload new edited docs

        this.AddModel.legalDocuments.push(result)

      })
      .catch(e => console.log(e))
  }
}

back(){
  const navigationExtra={
    queryParams:{
      option:'landlord'

    }
  }


  this.route.navigate(['/rent-details-list'],navigationExtra)

}
}
