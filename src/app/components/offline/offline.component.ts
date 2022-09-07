import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OfflineComponent,
      multi: true
    }
  ]
})
export class OfflineComponent implements OnInit {

  @Input() progress: any;
  onChange!: Function;

  
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  

  ngOnInit(): void {
  }

}
