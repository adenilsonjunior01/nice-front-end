import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'início',
        title: 'início',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard/analytics',
        breadcrumbs: false
      },
      {
        id: 'home',
        title: 'Meu Perfil',
        type: 'item',
        icon: 'feather icon-user',
        url: '',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'usuario',
    title: 'GESTÃO DE USUÁRIOS',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'novo-usuario',
        title: 'Usuário',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'novo',
            title: 'Cadastrar',
            type: 'item',
            url: '/user/register'
          },
          {
            id: 'listar',
            title: 'Listar',
            type: 'item',
            url: '/user/listar'
          }
        ]
      }
    ]
  },
  {
    id: 'colaboradores',
    title: 'gestão de Colaboradores',
    type: 'group',
    icon: 'feather icon-layout',
    children: [
      {
        id: 'registro',
        title: 'Registro',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'colaborador',
            title: 'Colaborador',
            type: 'item',
            url: '/registro/colaborador'
          },
          {
            id: 'empresa',
            title: 'Empresa',
            type: 'item',
            url: '/registro/empresa'
          }
        ]
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/login',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
