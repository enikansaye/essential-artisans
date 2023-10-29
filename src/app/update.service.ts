import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
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
                this.checkForUpdate();

              });
    // this.SwUpdate.versionUpdates.subscribe(event => {
    //   this.showAppUpdateAlert();
    // });
}
// public checkForUpdates(): void {
//     this.SwUpdate.versionUpdates.subscribe(event => {
//     const dialogRef = this.dialog.open(OfflineComponent, {
//         width: '400px',
//         data: { tite: 'Confirmation ' },
//       });
//       dialogRef.afterClosed().subscribe((result: any) => {
//         if (result && this.SwUpdate.isEnabled) {
//          this.updateApp();
//         }
//       });
//     });
//   }
  // showAppUpdateAlert() {
  //   const header = 'App Update available';
  //   const message = 'Choose Ok to update';
  //   const action = this.doAppUpdate;
  //   const caller = this;
  //   // Use MatDialog or ionicframework's AlertController or similar
  //   this.snackbar.open(header, message, action);
  // }
  // doAppUpdate() {
  //     this.SwUpdate.activateUpdate().then(() => document.location.reload());
  //   }
  

  // private updateApp(): void {
  //   this.SwUpdate.activateUpdate().then(() => document.location.reload()); 
  // }



 public checkForUpdate():void {
  
    this.SwUpdate.versionUpdates.subscribe(()=> this.promptUser());
 }

private promptUser(): void{
    let snackbar = this.snackbar.open('An update is Available', "Reload", {duration: 10*10000})


    snackbar
    .onAction()
    .subscribe(()=> {

        this.SwUpdate.activateUpdate().then(()=>window.location.reload())
    })
}
}