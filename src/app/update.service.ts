import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate } from "@angular/service-worker";


@Injectable({
    providedIn : 'root'
})

export class UpdateService{
constructor(private SwUpdate: SwUpdate, private snackbar : MatSnackBar){
    if(!SwUpdate.isEnabled){
        console.log('Service worker is not enabled');
        
    }
}
 public checkForUpdate():void {
    this.SwUpdate.versionUpdates.subscribe(()=> this.promptUser());
 }

private promptUser(): void{
    let snackbar = this.snackbar.open('An update is Available', "Reload", {duration: 10*1000})


    snackbar
    .onAction()
    .subscribe(()=> {
        this.SwUpdate.activateUpdate().then(()=>window.location.reload())
    })
}
}