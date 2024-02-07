import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


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
  ],
  providers: [BackendService],
})
export class CmdkComponent {
  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private backendService: BackendService) {}

  inputValue = '';
  messages: ChatMessage[] = [];

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
    "lista tarefas",
    " Qual é o utilizador ao qual a tarefa com o ID c6e23d19-0185-44bd-9127-02301871eb7b está atribuído?",
    "Quantas tarefas pertencem à loja 50 e à categoria zaffari?",
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
    if (this.activePage === 'tasks' || this.activePage === 'Task Detail' || this.activePage === 'Help') {
      this.popPage(); 

     
      if (!this.pages.includes('home')) {
        this.pages.push('home'); 
      }
    }
  }
  
}