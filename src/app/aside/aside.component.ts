import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Link } from '../link/link.model';
import { Target } from '../link/target.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnChanges {

  @Input() list_links:any[] = [];
  list_links_copy:any[] = [];
  @Input() isEditMode:boolean = false;
  @Input() open:boolean = false;
  @Input() filters:boolean = false;
  canFilters:boolean = true;

  @Output() newLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() deleteLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() closeAsideEmitter = new EventEmitter<void>();

  foldersOpen:boolean[] = [];

  date:string = '';
  time:string = '';

  days:string[] = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  months:string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor() { }

  ngOnInit(): void {
    this.showDate();
    this.foldersOpen.fill(false,0,this.list_links.length);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEditMode?.currentValue) {
      this.showOnly(0);
      this.canFilters = false;
    } else {
      this.canFilters = true;
    }
    this.list_links_copy = this.list_links.slice();
  }

  closeAside(event:Event) {
    if (this.open) {
      event.stopPropagation();
      this.closeAsideEmitter.emit();
    }
  }

  openFolder(options:any) {

    for (let i = 0; i<this.list_links.length;i++) {
      if (i == options.index)
        this.foldersOpen[i] = options.open;
      else
        this.foldersOpen[i] = false;

    }

  }

  showOnly(option:number) {
    let list_links_aux:any = [];
    switch(option) {
      case 0:
        this.filters = false;
        this.list_links = this.list_links_copy.slice();
        this.list_links.sort((a,b) => {
          return a.getNumberLink() - b.getNumberLink();
        });
        break;
      case 1:
        this.filters = true;
        this.list_links = [];
        this.list_links_copy.forEach((value) => {
          if (value.getFolder() != 0) this.list_links.push(value);
          else list_links_aux.push(value);

        });
        this.list_links = this.list_links.concat(list_links_aux);
        break;
      case 2:
        this.filters = true;
  
        this.list_links = [];
        this.list_links_copy.forEach((value) => {
          if (value.getFolder() == 0) this.list_links.push(value);
          else list_links_aux.push(value);
        });
        this.list_links = this.list_links.concat(list_links_aux);
        break;
    }
  }


  showDate() {
    const date =  new Date();

    this.date = this.days[date.getDay()] + ' ' + date.getDate().toString() + ' de '+ this.months[date.getMonth()];

    this.time = this.formatNumber(date.getHours()) + ':' + this.formatNumber(date.getMinutes()) + ':' + this.formatNumber(date.getSeconds());

    setTimeout(() => this.showDate(),1000);
  }

  formatNumber(n:number) {

    if (n < 10) {
      return '0' + n;
    }
    return n;
  }


}
