import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-cards-widget20',
  templateUrl: './cards-widget20.component.html',
  styleUrls: ['./cards-widget20.component.scss'],
  providers: [DatePipe]
})
export class CardsWidget20Component implements OnInit {
  @Input() cssClass: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';

  @Input() width: any = '';
  @Input() percent: any = '';
  @Input() nbrElement: any = '';

  nbr_commande:string = 'Nombres de commande';
  constructor(private datePipe: DatePipe,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {
 
  }





    
}
