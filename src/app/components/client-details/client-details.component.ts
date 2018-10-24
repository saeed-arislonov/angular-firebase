import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;


  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      if (client.balance === null) {
        client.balance = 0;
      }
      this.client = client;
    });
  }

  updateBalance() {
    this.clientService.updateBalance(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert alert-success',
      timeout: 3000
    });
  }

}
