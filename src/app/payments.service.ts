import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor() {}

  addPayment(paymentsArr: any[], newPayment) {
    paymentsArr.push(newPayment);
    return paymentsArr;
  }

  updatePayment(paymentsArr, index, newPayment) {
    paymentsArr[index] = newPayment;
    console.log(paymentsArr);
    return paymentsArr;
  }

  deletePayment(paymentsArr, index) {
    paymentsArr.splice(index);
  }
}
