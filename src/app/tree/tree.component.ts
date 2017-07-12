import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any= [];


  constructor(private treeService: TreeService) {

    treeService.setDatum(this.treeData);

    Observable.from(this.treeData).subscribe((d)=>treeService.update(d));
  }

  ngOnInit() {
    const root= this.treeService.createChart(this.chartContainer, this.treeData);
    this.treeService.update(root);
  }

  ngOnChanges() {}

}
