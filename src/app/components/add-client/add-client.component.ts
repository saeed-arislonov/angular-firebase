import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessage.show('Please fill out the form corectly', {
        cssClass: 'alert alert-danger',
        timeout: 4000
      });
    } else {
      this.clientService.newClient(value);

      this.flashMessage.show('New Client Added', {
        cssClass: 'alert alert-success',
        timeout: 4000
      });

      this.router.navigate(['/']);

    }

  }

}
