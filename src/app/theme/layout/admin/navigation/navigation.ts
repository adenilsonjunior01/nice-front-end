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
        breadcrumbs: false,
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
          },
          {
            id: 'listar',
            title: 'Listar',
            type: 'item',
            url: '/user/listar'
          },
          {
            id: 'listar',
            title: 'Listar',
            type: 'item',
            url: '/user/listar'
          },
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
        title: 'Colaboradores',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'cadastrar-colaborador',
            title: 'Cadastrar',
            type: 'item',
            url: '/colaborador/registro'
          },
          {
            id: 'lista-colaboradores',
            title: 'Listar',
            type: 'item',
            url: '/colaborador/listar'
          }
        ]
      }
    ]
  },
  {
    id: 'empresas',
    title: 'Gestão de Empresas',
    type: 'group',
    icon: 'feather icon-layout',
    children: [
      {
        id: 'empresa',
        title: 'Empresa',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'cadastrar-empresa',
            title: 'Cadastrar',
            type: 'item',
            url: '/empresa/registro'
          },
          {
            id: 'listar-empresa',
            title: 'Listar',
            type: 'item',
            url: '/empresa/listar'
          }
        ]
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
