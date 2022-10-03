import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { NotificationModel } from '../notification.model';
// import { NotificationModel } from '';

@Injectable({
  providedIn: 'root'
})




export class SignalrService {
  public data!: NotificationModel[];

  private hubConnection!: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7130/notification', {
                                skipNegotiation: true,
                                transport: signalR.HttpTransportType.WebSockets
                              })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addNotificationDataListener = () => {
      this.hubConnection.on('notification', (data) => {
        this.data = data;
        console.log(data);
      });
    }
}