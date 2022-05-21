import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  accept: boolean = false;

  process: boolean = false

  service = 'completed';  
  constructor() { }

  ngOnInit(): void {
  }
clickEvent(){
  this.accept = !this.accept
}
}
