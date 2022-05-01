import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  service = 'completed';  
  constructor() { }

  ngOnInit(): void {
  }

}
