import { Component, Input, OnInit } from '@angular/core';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';
import { ConfirmMenuInterface } from './confirm-menu.interface';

@Component({
  selector: 'app-confirm-menu',
  templateUrl: './confirm-menu.component.html',
  styleUrls: ['./confirm-menu.component.css']
})
export class ConfirmMenuComponent implements OnInit {

  @Input() mainText:string = '';
  @Input() mainButtonText:string = '';
  @Input() secondaryButtonText:string = '';

  @Input() object!:ConfirmMenuInterface


  constructor() { }

  ngOnInit(): void {
  }

  onClickMainFunction(event:MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (event.button !== 0) return;

    this.object.mainFunction();

  }

  onClickSecondaryFunction(event:MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (event.button !== 0) return;

    this.object.secondaryFunction();

  }

}
