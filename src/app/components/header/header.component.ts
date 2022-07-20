import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Emitters } from 'src/emitters/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  searchTerm: any;
  term!:string;
  total:any = 0;
  // results: IGetArticleModel[];
  perPage: number = 10;
  filter: any = "search-by-topic-name";
  pageNumber:number = 1;

  searchBarVisible: boolean = true;
  showBar: boolean = false;
  show: boolean = false;
  public signinForm !: FormGroup;
  authenticated = false;

  constructor(private formBuilder: FormBuilder, private http : HttpClient,private route: ActivatedRoute, private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
 
    this.route.params.subscribe(params =>{
      // console.log(params.searchTerm);
      // if(params.searchTerm)
        // this.searchTerm = params.searchTerm;
    })
    
  }

  // get user(): User {
  //   return this.userService.User;
  // }

  // logout(prop): void {
  //   this.show = prop;
  //   this.authService.logout();
  // }

  // get isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn;
  // }

  onMouseover() {
    this.searchBarVisible = true;
  }

  onMouseout() {
    this.searchBarVisible = false;
  }

  onChangeClass() {
    this.showBar = !this.showBar;
  }

  dropdown(): void {
    this.show = !this.show;
  }
  @HostListener('window:click', ['$event']) onDocumentClick(event:any): void {
    this.show = false;
  }

  @HostListener('window:resize', ['$event']) onResize(event:any): void {
    this.show = false;
  }

  openModal(id: string) {
    // this.modalService.open(id);
  }

  closeModal(id: string) {
    // this.modalService.close(id);
  }

  search():void{
    if(this.searchTerm)
      this.router.navigateByUrl('articles/search/' + this.searchTerm)
  }

  
}


