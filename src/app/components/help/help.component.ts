import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  @Input('title') title: string | undefined;
  isExpanded?: boolean;
 
  toggle() {
    this.isExpanded = !this.isExpanded
  }

 

  ngOnInit(): void {
  }

}
