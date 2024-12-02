import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;
  private metricUpdatesSource = new BehaviorSubject<any>(null);
  metricUpdates$ = this.metricUpdatesSource.asObservable();

  constructor() {
    this.createConnection();
    this.startConnection();
  }

  private createConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7032/monitoringHub') // Replace with your SignalR hub URL
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.on('ReceiveMetricUpdate', (metricName: string, value: string) => {
      this.metricUpdatesSource.next({ metricName, value });
    });
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection established');
      })
      .catch(err => {
        console.error('Error establishing SignalR connection', err);
      });
  }
}
