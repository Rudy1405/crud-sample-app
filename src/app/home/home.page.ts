import { Component } from '@angular/core';
import {PaymentsService} from '../payments.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  payments: any = [
    {
      title: 'Movie Tickets',
      amount: 13,
      description: 'Its a Hobby ok?'
    },
    {
      title: 'Movie Tickets',
      amount: 13,
      description: 'Its a Hobby ok?'
    },
    {
        title: 'Movie Tickets',
        amount: 13,
        description: 'Its a Hobby ok?'
    }
  ];
  total = 0;



  constructor(public payService: PaymentsService, public actionSheetController: ActionSheetController, public alertCtrl: AlertController) {
     if (this.payments.length !== 0) {
       this.updateTotal();
     }
  }

  howToAlert() {
    alert('Select a card, pick an option, also add new payments with that + button down there');
  }

  updateTotal() {

    this.total = 0;
    this.payments.forEach(payment => {
      this.total = this.total + parseInt(payment.amount, 0);
    });
  }

  async addPayment() {
      const alert = await this.alertCtrl.create({
        header: 'Register New Payment!',
        inputs: [
          {
            name: 'title',
            type: 'text',
            id: 'id1',
            placeholder: 'Payment name'
          },
          {
            name: 'amount',
            type: 'number',
            id: 'id2',
            placeholder: '$'
          },
          {
            name: 'description',
            type: 'text',
            placeholder: 'description of the payment'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: data => {
              console.log('Confirm Ok');
              console.log(data);
              this.payments = this.payService.addPayment(this.payments, {
                title: data.title,
                amount: data.amount,
                description: data.description
              });
              this.updateTotal();
            }
          }
        ]
      });
      await alert.present();
    }

 async updatePayment(index) {
    const alert = await this.alertCtrl.create({
      header: 'Update this Payment!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          id: 'id1',
          placeholder: 'Payment name'
        },
        {
          name: 'amount',
          type: 'number',
          id: 'id2',
          placeholder: '$'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'description of the payment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Ok');
            console.log(data);
            const newPayment = {
                title: data.title,
                amount: data.amount,
                description: data.description
              };
            this.payments = this.payService.updatePayment(this.payments, index, newPayment);
            this.updateTotal();
          }
        }
      ]
    });
    await alert.present();
  }

 async deletePayment(paymentArr, index) {
    this.payService.deletePayment(paymentArr, index);
    const alert = await this.alertCtrl.create(
      {
        message: ' payment, removed'
      }
    );
    await alert.present();
    setTimeout(() => {
      this.updateTotal();
    }, 1500);

  }

  async cardOptions(payment, index) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Options',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
            this.deletePayment(this.payments, index);
          }
        }, {
          text: 'Update',
          icon: 'refresh',
          handler: () => {
            console.log('update clicked');
            this.updatePayment(index);
          }
        }, {
          text: 'See details',
          icon: 'eye',
          handler: () => {
            console.log('See clicked');
            this.showDescription(payment.description);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  }

  async showDescription(description) {
    const alert = await this.alertCtrl.create({
      message: description
    });
    await alert.present();
  }

}
