import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AllcategoriesComponent } from './allcategories/allcategories.component';

@NgModule({
  imports:[ReactiveFormsModule],
  exports:[ReactiveFormsModule],
  declarations: [
    AllcategoriesComponent
  ]
})
export default class SharedModule { };