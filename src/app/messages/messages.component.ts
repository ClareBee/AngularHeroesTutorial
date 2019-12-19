import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { } // has to be public as bound in the template

  ngOnInit() {
  }

}
