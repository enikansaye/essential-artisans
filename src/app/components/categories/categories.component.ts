import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() content !: string;
  @Output() cardClick: EventEmitter<void> = new EventEmitter<void>();

  text = '';

  onCardClick(): void {
    this.cardClick.emit();
  }
 

  constructor(public data: UserService,) { }

  ngOnInit(): void {
  }

}
