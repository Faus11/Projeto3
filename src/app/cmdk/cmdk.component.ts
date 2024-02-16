import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

import {
  CommandComponent,
  EmptyDirective,
  GroupComponent,
  InputDirective,
  ItemDirective,
  ListComponent,
  SeparatorComponent,
} from '@ngneat/cmdk';
import { CommonModule, NgIf, NgStyle } from "@angular/common";
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
}

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
    NgStyle,
    NgIf,
    CommonModule,
    HttpClientModule,
    NgxEchartsDirective,
  ],
  providers: [BackendService, provideEcharts(),],
})
export class CmdkComponent implements AfterViewInit {
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;
  taskMetricsOptions: EChartsOption = {};
  searchResourcesOptions: EChartsOption = {};
  resourceMetricsOptions: EChartsOption = {};
  constructor(private router: Router, private backendService: BackendService) {}
  ngAfterViewInit() {

    this.buildTaskMetricsChart();
    this.buildSearchResourcesChart();
    this.resourceMetricsChart();
  }

  resourceMetricsChart() {
    this.resourceMetricsOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'X-1',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'X-2',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'X-3',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'X-4',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'X-5',
          type: 'line',
          stack: 'counts',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
  }

  buildSearchResourcesChart() {
    const dataAxis = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
    ];
    const data = [
      220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125,
      220,
    ];
    const yMax = 500;
    const dataShadow = [];

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.searchResourcesOptions = {
      title: {
        text: 'Check Console for Events',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }

  buildTaskMetricsChart() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.taskMetricsOptions = {
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
          animationDelay: idx => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
  
  
  inputValue = '';
  messages: ChatMessage[] = [];

  askToFindMessage: string = '';
  pages: Array<string> = ['home'];
  loading = false;
  loadingMsg = 'loading page...';
  emptyMsg = '';
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
          itemSelected: () => {
            this.taskMetrics();
          },
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
          itemSelected: () => {
            this.searchResources();
          },
        },
        {
          label: 'See Resources Metrics',
          icon: 'ph-chart-line',
          shortcut: '',
          itemSelected: () => {
            this.resourceMetrics();
          }
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
        // {
        //   label: 'Contact Support',
        //   icon: ContactIconComponent,
        //   shortcut: '',
        //   separatorOnTop: true,
        // },
      ],
    },
  ];

  readonly tasksList = [
    "Qual é o ID da tarefa que pertence à loja 40 e à categoria zaffari?",
    "Lista-me tudo.",
    " Qual é o utilizador ao qual a tarefa com o ID c6e23d19-0185-44bd-9127-02301871eb7b está atribuído?",
    "Quantas tarefas pertencem à loja 50 e à categoria zaffari?",
    "Quantas tarefas pertencem à loja 40 ?",
    " Quais são os IDs das tarefas que pertencem à loja 33 e à categoria zaffari?",
    "Quantas tarefas existem no total?",
    "A tarefa com o ID b97fd9e7-0e53-4553-8186-11869262901c está atribuída a algum utilizador?",
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
    let input = ev.target as HTMLInputElement;
    this.inputValue = input.value;
    
    // Limpar o histórico de mensagens antes de enviar uma nova mensagem
    this.messages = [];
  
    if (this.inputValue.trim().length > 0) {
      const userMessage: ChatMessage = {
        content: `Eu: ${this.inputValue}`,
        sender: 'user',
      };
      this.messages.push(userMessage);
      this.backendService
        .post('/chat', { question: this.inputValue })
        .subscribe(
          (response) => {
            const botMessage: ChatMessage = {
              content: `Chatbot: ${response[1].content}`,
              sender: 'bot',
            };
            this.messages.push(botMessage);
            input.value = '';
          },
          (error) => {
            console.error('Error posting data:', error);
          }
        );
    }
  }
  
  onKeyDown(ev: KeyboardEvent) {
    // handle shortcuts
    if (ev.ctrlKey && ev.key === 't') {
      ev.preventDefault();
      this.pages.push('tasks');
    }
    // default behaviours
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
  taskMetrics() {
    this.pages.push('taskMetrics');
  }
  searchResources() {
    this.pages.push('searchResources');
  }
  resourceMetrics() {
    this.pages.push('resourceMetrics');
  }
 searchTask(task: string) {
  this.loading = true; // Define loading como true antes de fazer a solicitação
  this.backendService.post('/chat', { question: task }).subscribe(
    (response) => {
      this.currentTask = response[1].content;
      this.pages.push('Task Detail');
      this.loading = false; // Define loading como false após receber a resposta da API
    },
    (error) => {
      console.error('Error fetching task detail:', error);
      this.loading = false;
    }
  );
}

  showMessage() {
    
    this.loading = false;
    
    this.pages.push('Help');
  }
  goToHomePage() {
    if (this.activePage === 'tasks' || this.activePage === 'Task Detail' || this.activePage === 'taskMetrics' || this.activePage === 'searchResources' || this.activePage === 'resourceMetrics' || this.activePage === 'Help') {
      this.popPage(); 

     
      if (!this.pages.includes('home')) {
        this.pages.push('home'); 
      }
    }
  }
  
}