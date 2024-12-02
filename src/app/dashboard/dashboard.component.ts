import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() loading: boolean = false;
  chart!: Chart<'doughnut'>;
  company: any = {};
  jobs: any = {};
  metricData: any = {}; // Store the metric data here

  // Variables for system metrics
  cpuUsage: number = 0;
  memoryUsage: number = 0;
  diskUsage: number = 0;
  pipelineCount: number = 3;

  constructor(
    private router: Router,
    private signalRService: SignalRService // Inject the SignalR service
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createDoughnutChart();
    this.createBarChart();
  
    // Subscribe to the SignalR metric updates
    this.signalRService.metricUpdates$.subscribe(update => {
      console.log('Received Metric Update:', update);  // Log the data to console
      if (update) {
        this.updateMetricData(update);
      }
    });
  }
  
  // Method to update the chart with the new metric data
  updateMetricData(update: any): void {
    if (update.metricName === 'CPU Usage') {
      // Update the doughnut chart data with the CPU usage
      this.chart.data.datasets[0].data[0] = parseFloat(update.value); // Assuming 0th index is CPU usage
      this.cpuUsage = parseFloat(update.value); // Update the CPU Usage display
    }
    if (update.metricName === 'Memory Usage') {
      this.memoryUsage = parseFloat(update.value); // Update Memory Usage
    }
    if (update.metricName === 'Disk Usage') {
      this.diskUsage = parseFloat(update.value); // Update Disk Usage
    }
    // Handle other metrics here (e.g., pipelines, etc.)
    this.chart.update(); // Trigger a chart update
  }

  createDoughnutChart(): void {
    this.chart = new Chart('doughnutChartCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Critical', 'Warning', 'Normal', 'Idle'],
        datasets: [
          {
            label: 'System Health Distribution',
            data: [25, 35, 30, 10], // Example initial data
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              }
            }
          }
        }
      }
    });
  }

  createBarChart(): void {
    new Chart('chartCanvas', {
      type: 'bar',
      data: {
        labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'],
        datasets: [
          {
            label: 'Performance Metrics',
            data: [10, 20, 30, 40], // Example initial data
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return `Value: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/landing-page']);
  }
}
