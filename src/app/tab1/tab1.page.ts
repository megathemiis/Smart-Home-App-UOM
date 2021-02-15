import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  constructor(private http: HttpClient) {}

  public latestData = [];
  public tempData = [];
  getDurationInterval: any;
  public valueONOFF = false;
  public loaded = false;

  ngOnInit(){
    this.fetchData();
    this.getDurationInterval = setInterval(() => { this.fetchData(); }, 10000);
  }

  fetchData(){
    this.http
    .get<any>
    ('https://api.thingspeak.com/channels/1098345/feeds.json?api_key=22E1NIPKMAH7HVQ9&results=1&round=2')
    .pipe(map(resData => {
      return resData.feeds;
    }))
    .subscribe( afterData => {
      this.tempData = afterData;
      this.loaded = true;
    });

  }

  smartONOFF(){
    if (this.valueONOFF === true) {
      this.http.get('https://api.thingspeak.com/update?api_key=55MM8CZUTVEVUPTH&field1=1').subscribe();
      this.valueONOFF = false;
      console.log(this.valueONOFF);
    }
    else {
      this.http.get('https://api.thingspeak.com/update?api_key=55MM8CZUTVEVUPTH&field1=0').subscribe();
      this.valueONOFF = true;
      console.log(this.valueONOFF);
    }
  }

}

