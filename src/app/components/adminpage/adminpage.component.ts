import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PageEvent } from '@angular/material/paginator';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './cool-theme';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  userData: any;
  
  // ngx-chart
  options: any;
  chartOption: any;

  expression = 'page1';
  service = 'completed';
  totalRecord: any;
  page:number=1
  artisanData: any;
  othersData: any;
  AllOrderData: any;
  
  

  constructor(private observer: BreakpointObserver, private api: ApiService,  private adminApi: AdminService) {}


  ngOnInit(): void {
    this.getAllUser();
    this.getAllArtisan();
 

    this.getAllUser()
    // ngx chart
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.chartOption = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };

    this.options = {
      title: {
        text: "Nightingale's Rose Diagram",
        subtext: 'Mocking Data',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8',
        ],
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' },
          ],
        },
      ],
    };
  }

  theme!: string | ThemeOption;
  coolTheme = CoolTheme;

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
// consuming api section
// getAllUser() {
//   this.api.getUser().subscribe((res: any) => {
//     this.userData = res;
//     console.log(this.userData)
//     console.log(res)
//   });
// }
// getAllArtisan() {
//   this.api.getArtisan().subscribe((res: any) => {
//     this.userData = res;
//   });
// }

getAllUser() {
  this.adminApi.getUser().subscribe((res: any) => {
    this.userData = res;

    console.log(this.userData)
    this.totalRecord=res.length;
    console.log(this.totalRecord);
    
  
  });
}
getAllArtisan() {
  this.adminApi.getArtisan().subscribe((res: any) => {
    this.artisanData = res;
    console.log(this.artisanData)
    this.totalRecord=res.length;
    console.log(this.totalRecord);
  });
}
getAllOthers() {
  this.adminApi.getOthers().subscribe((res: any) => {
    this.othersData = res;
    console.log(this.othersData)
  });
}

deleteArtisan(id:number){
  this.adminApi.deleteArtisan(id).subscribe((res:any)=>{
    alert('artisan deleted')
   this.getAllArtisan();
  })
}

getArtisanById(id:string){
  this.adminApi.getArtisanbyid(id).subscribe((res:any)=>{
    this.artisanData = res;
  })
}




}
