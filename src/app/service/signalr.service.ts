import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotificationModel } from '../notification.model';
import { ApiService } from './api.service';
// import { NotificationModel } from '';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  notificationCount: any;
  notificationMessage: any;
  notificationText: any;
  notification: any;

  constructor(private api: ApiService, private http: HttpClient) {}

  public data!: NotificationModel[];

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7130/notification', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        // console.log('Connection started')
      })
      .catch((err) => {
        // console.log('Error while starting connection: ' + err)
      });
  };

  public addNotificationDataListener = () => {
    this.hubConnection.on('notification', (data) => {
      this.data = data;
      // console.log('this...........');
// this. getNotification()
      // console.log(data);


      
    });
  };

  // notification api
  getNotification() {
    return this.http
      .get<any>(this.api.baseUrl + '/api/Notification/user-notifications')
      .subscribe((res: any) => {
        // console.log(res);
        
        this.notification = res;
        this.notificationCount = res.countOfNotifications;
        this.notificationMessage = res.userNotifications;

        let spaghettiProperties = Object.keys(this.notificationMessage);

        var neededArray = [];

        let i = 0;
        for (const prop of spaghettiProperties) {
          neededArray.push(this.notificationMessage[prop]);

          i++;
        }
        // console.log(neededArray);
        this.notificationText = neededArray;
      });
  }
}
