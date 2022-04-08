import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent implements OnInit {

  @Input('title') title: string | undefined;
  isExpanded?: boolean;
 
  toggle() {
    this.isExpanded = !this.isExpanded
  }

  constructor() { }

  ngOnInit(): void {
  }

}
