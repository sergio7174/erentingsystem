
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RentService {

  serverURL = environment.serverURL;
  baseUri: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  Addroom(AddModel:any){return this.http.post(`${this.serverURL}api/landlord/add-rent-details`,
          AddModel)}

 Editroom(editRoomDetails:any){
    const {_id:userId} = editRoomDetails
    return this.http.put(`${this.serverURL}api/landlord/edit-rent-details/${userId}`,editRoomDetails)}




// Get Rent Data
getRentData(id): Observable<any> {

  alert ('estoy en rent.service, line 43, id:'+ id)

  const userDetails:any = JSON.parse(localStorage.getItem('userId')|| '{}')

  alert ('estoy en rent.service, line 47, userDetails.role:'+ userDetails.role)
  alert ('estoy en rent.service, line 47, userDetails._id:'+ userDetails._id)

  if(userDetails?.role=='landlord'){
  return this.http.get(`${this.serverURL}api/landlord/get-all-rent-details/${ userDetails._id ,id}`).pipe(
    map((doc: Response) => {

      return doc || {};
      }


      ), catchError(this.errorMgmt)

      )


  }else{
    return this.http.get(`${this.serverURL}api/tenant/get-tenant-rent-details/${userDetails._id},{ headers: this.headers }`).pipe(map((doc: Response) => {
      return doc || {};}), catchError(this.errorMgmt))
  }



}




    getRentDetails() {

         const userDetails:any = JSON.parse(localStorage.getItem('userId')|| '{}')

         alert ('estoy en rent.service, line 70, userDetails.role:'+ userDetails.role)
         alert ('estoy en rent.service, line 71, userDetails._id:'+ userDetails._id)


  if(userDetails?.role=='landlord'){
  return this.http.get(`${this.serverURL}api/landlord/get-all-rent-detailsU/${userDetails._id}`)

  }else{
    return this.http.get(`${this.serverURL}api/tenant/get-tenant-rent-detailsU/${userDetails._id}`)
  }



  }


// Update Rentdetails **

updateRentDetails(id, data): Observable<any> {

  let url = `${this.serverURL}api/landlord/edit-rent-details/${id}`;


  return this.http.put(url, data ).pipe(catchError(this.errorMgmt));

}






  /*deleteRentDetails(){
   const deletedRoom = JSON.parse(localStorage.getItem('deleteRoom') || '{}')
   const {_id:userId} = deletedRoom;
   return this.http.delete(`${this.serverURL}api/landlord/delete-rent-details/${userId}`)}*/


    // Delete employee
    deleteRentDetails(userId): Observable<any> {
      /*let url = `${this.serverURL}api/landlord/delete-rent-details/${userId}`;
      return this.http
        .delete(url, { headers: this.headers })
        .pipe(catchError(this.errorMgmt));*/

        const deletedRoom = JSON.parse(localStorage.getItem('deleteRoom') || '{}')

   return this.http.delete(`${this.serverURL}api/landlord/delete-rent-details/${userId}`)}


// Error handling
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}




  getTenantDetails(){

    const {tenantId:userId} = JSON.parse(localStorage.getItem('bookingInfo') || '{}')
    // console.log('booking',userId)
    return this.http.get(`${this.serverURL}api/tenant/get-tenant-details/${userId}`)}

  approveBooking() {
    const {_id:bookingId} = JSON.parse(localStorage.getItem('bookingInfo') || '{}')

    return this.http.put(`${this.serverURL}api/landlord/approve-booking/${bookingId}`,{})}

rejectBooking(){
  const {_id:bookingId} = JSON.parse(localStorage.getItem('bookingInfo') || '{}')

  return this.http.delete(`${this.serverURL}api/landlord/reject-booking/${bookingId}`)
}

getChart(){
  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')

  return this.http.get(`${this.serverURL}api/landlord/landLord-monthly-booking/${landLordId}`)
}

getTotalRooms(){
  console.log("Estoy en getTotalRooms ....")
  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')
  return this.http.get(`${this.serverURL}api/landlord/get-total-rooms/${landLordId}`)

}

roomsApproved(){
  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')
  return this.http.get(`${this.serverURL}api/landlord/get-all-approved-rooms/${landLordId}`)

}

getpendingRooms(){
  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')
  return this.http.get(`${this.serverURL}api/landlord/get-all-pending-rooms/${landLordId}`)
}


getallotmentdetails(){
  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')
  return this.http.get(`${this.serverURL}api/landlord/get-tenant-booking-details/${landLordId}`)


}


getBookingDetails(){

  const {_id:landLordId} = JSON.parse(localStorage.getItem('userId') || '{}')

  return this.http.get(`${this.serverURL}api/landlord/get-booking-details/${landLordId}`)
}

}
