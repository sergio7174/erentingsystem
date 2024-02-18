import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RentService } from '../../services/rent.service';

export interface listrent {

  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  roomTypes: string;
  action: string;

}

 const ELEMENT_DATA: listrent[] = [];

@Component({
  selector: 'app-list-rent-details',
  templateUrl: './list-rent-details.component.html',
  styleUrls: ['./list-rent-details.component.css']
})
export class ListRentDetailsComponent implements OnInit {

  param:any=""
  userDetails:any={}
  landlord:any = [];

  constructor( private rentService: RentService,private route: Router,
    private router:ActivatedRoute) {
    this.router.queryParams.subscribe((params=>{
      this.param = params['option'];
    }))
   }




  ngOnInit(): void {
    this.getRentDetails();

  }


  info(row:any){
    // row.image=[]
    // row.legalDocuments=[]
    localStorage.setItem('viewRoom',JSON.stringify(row))
    this.route.navigate(['/viewdetails'])
  }

  add_room() {
    this.route.navigate(['/addrent2']);
  }
  displayedColumns: string[] = ['streetname', 'city', 'district', 'state', 'pincode', 'roomtype', 'action',];
   dataSource = ELEMENT_DATA;

  getRentDetails() {
    //call to backend
    this.rentService.getRentDetails().subscribe((res: any) => {
      console.log(res)

      this.dataSource = res;
      alert ("Estoy en list-rent-details, line 68 - dataSource:"+ this.dataSource) 

    })
  }


  editDetails(id:any){
    // row.image=[]
    // row.legalDocuments=[]
    localStorage.setItem('editRoom',JSON.stringify(id));
    alert ("Estoy en list-rent-details- editDetails , line 75, id:"+id)
    this.route.navigate(['/editrent2',id]);
  }

  /*deleteDetails(row:any){
    // row.image=[]
    // row.legalDocuments=[]
    console.log("Esta es la linea a borrar: "+row)
    localStorage.setItem('deleteRoom',JSON.stringify(row))
    this.rentService.deleteRentDetails().subscribe((res:any)=>{
      const navigationExtra={
        queryParams:{
          option:'landlord'
        }
      }



      // this.router.navigate(['/'],navigationExtra)
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate(['rent-details-list'], navigationExtra);

    })
  }*/

  deleteDetails (landlord, index) {

    this.rentService.deleteRentDetails(landlord._id).subscribe((data) => {
      this.landlord.splice(index, 1);
})}



}




