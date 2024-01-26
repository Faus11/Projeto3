import {Component, ElementRef, ViewChild} from '@angular/core';
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
import {CommonModule, NgIf, NgStyle} from "@angular/common";

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
  ],
})
export class CmdkComponent {
  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;
  constructor(private router: Router) {}
  inputValue = '';
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
    // handle shortcuts
    if (ev.ctrlKey && ev.key === 't') {
      ev.preventDefault();
      this.pages.push('tasks');
    }

    // default behaviours
    if (ev.key === 'Enter') {
      this.bounce();
    }

    if (this.isHome || this.inputValue.length) {
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
    }, 2000);
  }

  goToHomePage() {
    if (this.activePage === 'tasks' || this.activePage === 'Task Detail' ) {
      this.popPage(); // Remove a página "tasks" da pilha de páginas
  
      // Verifica se "home" já está na pilha de páginas
      if (!this.pages.includes('home')) {
        this.pages.push('home'); // Adiciona a página "home" à pilha de páginas apenas se ainda não estiver lá
      }
    }
    // Se a activePage não for "tasks", a função não fará nada
  }

}
