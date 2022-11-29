import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate } from "@angular/service-worker";
import { OfflineComponent } from "./components/offline/offline.component";


@Injectable({
    providedIn : 'root'
})

export class UpdateService{
constructor(private SwUpdate: SwUpdate, private snackbar : MatSnackBar, public dialog: MatDialog){
    // if(!SwUpdate.isEnabled){
    //     this.SwUpdate.available.subscribe(event => {
    //         this.showAppUpdateAlert();
    //       });
        
    // }
    this.SwUpdate.versionUpdates.subscribe(event => {
                // this.showAppUpdateAlert();
                this.checkForUpdates();

              });
}
public checkForUpdates(): void {
    this.SwUpdate.versionUpdates.subscribe(event => {
    const dialogRef = this.dialog.open(OfflineComponent, {
        width: '700px',
        data: { tite: 'Confirmation ' },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && this.SwUpdate.isEnabled) {
         this.updateApp();
        }
      });
    });
  }

  private updateApp(): void {
    console.log('updating to new version');
    this.SwUpdate.activateUpdate().then(() => document.location.reload()); 
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