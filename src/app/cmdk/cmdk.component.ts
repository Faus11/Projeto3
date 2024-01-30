import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { CommonModule } from "@angular/common";

import {
  CommandComponent,
  EmptyDirective,
  GroupComponent,
  InputDirective,
  ItemDirective,
  ListComponent,
  SeparatorComponent,
} from '@ngneat/cmdk';

@Component({
  selector: 'app-cmdk',
  templateUrl: './cmdk.component.html',
  styleUrls: ['./cmdk.component.scss'],
  standalone: true,
  imports: [
    CommandComponent,
    InputDirective,
    ListComponent,
    GroupComponent,
    ItemDirective,
    EmptyDirective,
    SeparatorComponent,
    CommonModule,
  ],
})
export class CmdkComponent implements AfterViewInit {
  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  inputValue = '';
  askToFindMessage: string = '';
  pages: Array<string> = ['home'];
  loading = false;
  loadingMsg = 'loading page...';
  emptyMsg = 'No results found.';
  readonly groups: Array<{
    group: string;
    items: Array<{
      label: string;
      itemSelected?: () => void;
      icon: string; // ph icon code
      shortcut: string;
      separatorOnTop?: boolean;
    }>;
  }> = [
    {
      group: 'Tasks',
      items: [
        {
          label: 'Search Tasks...',
          itemSelected: () => {
            this.searchTasks();
          },
          icon: 'ph-list',
          shortcut: '^ T',
        },
        {
          label: 'See Tasks Metrics',
          icon: 'ph-chart-pie',
          shortcut: '',
        },
      ],
    },
    {
      group: 'Resources',
      items: [
        {
          label: 'Search Resources...',
          icon: 'ph-scan',
          shortcut: '^ R',
        },
        {
          label: 'See Resources Metrics',
          icon: 'ph-chart-line',
          shortcut: '',
        },
      ],
    },
    {
      group: 'Help',
      items: [
        {
          label: 'Ask to find...',
          itemSelected: () => {
            this.showMessage();
          },
          icon: 'ph-question',
          shortcut: '^ A',
        },
      ],
    },
  ];

  readonly tasksList = [
    "Quantas tarefas de relabeling existem na lista?",
    "Qual é o nome da terceira tarefa de auditoria de preço?",
    "Existe alguma tarefa relacionada a Inventory na lista?",
    "Quantas tarefas de auditoria de preço estão agendadas para 01/01/2024?",
    "Quantas tarefas existem no total?",
    "Existem tarefas duplicadas na lista?",
    "Se houver tarefas duplicadas, quais são?",
    "Qual é o índice da tarefa Scan audit 01 na lista?",
    "Quais são as tarefas que contêm a palavra Price?",
  ];

  currentTask = '';
  styleTransform = '';

  filter: (value: string, search: string) => boolean = (value, search) => {
    return value.toLowerCase().includes(search.toLowerCase());
  }

  get activePage() {
    return this.pages[this.pages.length - 1];
  }

  get isHome() {
    return this.activePage === 'home';
  }

  setInputValue(ev: Event) {
    this.inputValue = (ev.target as HTMLInputElement).value;
  }

  onKeyDown(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === 't') {
      ev.preventDefault();
      this.pages.push('tasks');
    }
  
    if (ev.key === 'Enter') {
      this.bounce();
    }
  
    if (this.isHome) {
      return;
    }
  
    if (ev.key === 'Backspace') {
      ev.preventDefault();
      this.popPage();
      this.bounce();
    }
  }

  popPage() {
    this.pages.splice(-1, 1);
  }

  bounce() {
    this.styleTransform = 'scale(0.96)';
    setTimeout(() => {
      this.styleTransform = '';
    }, 100);
  }

  searchTasks() {
    this.pages.push('tasks');
  }

  searchTask(task: string) {
    this.loading = true;
    this.currentTask = task;

    setTimeout(() => {
      this.pages.push('Task Detail')
      this.loading = false;
      this.createChart();
    }, 2000);
  }

  showMessage() {
    this.loading = false;
    this.pages.push('Help');
  }

  goToHomePage() {
    if (this.activePage === 'tasks' || this.activePage === 'Task Detail' || this.activePage === 'Help') {
      this.popPage(); 
      if (!this.pages.includes('home')) {
        this.pages.push('home'); 
      }
    }
  }

  ngAfterViewInit() {
    if (this.activePage === 'Task Detail') {
      this.createChart();
    }
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  
    if (!ctx) {
      console.error('Unable to get 2D context for chart');
      return;
    }
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          label: 'Chart Title',
          data: [10, 20, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        }],
      },
    });
  }
  
  
  
}

