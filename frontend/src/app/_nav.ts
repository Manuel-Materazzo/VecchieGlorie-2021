import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    icon: 'icon-home'/*,
    badge: {
      variant: 'info',
      text: 'NEW'
    }*/
  },
  {
    title: true,
    name: 'Gestione Associati'
  },
  {
    name: 'Soci e visitatori',
    url: '/soci',
    icon: 'icon-people',
    children: [
      {
        name: 'Lista Soci',
        url: '/soci',
        linkProps: { queryParams: {'socio': true }},
        icon: 'icon-people'
      },
      {
        name: 'Lista Visitatori',
        url: '/visitatori',
        linkProps: { queryParams: {'socio': false }},
        icon: 'icon-people'
      },
      {
        name: 'Aggiungi un socio',
        url: '/sociNew',
        linkProps: { queryParams: { 'new' : true, 'socio': true }},
        icon: 'cil-user-plus'
      },
      {
        name: 'Aggiungi un visitatore',
        url: '/visitatoriNew',
        linkProps: { queryParams: { 'new' : true, 'socio': false }},
        icon: 'cil-user-plus'
      }
    ]
  },
  {
    name: 'Garage',
    url: '/garage',
    icon: 'cil-garage',
    children: [
      {
        name: 'Lista Auto',
        url: '/garage',
        icon: 'cil-car-alt'
      },
      {
        name: 'Aggiungi un\' auto',
        url: '/garageNew',
        linkProps: { queryParams: { 'new' : true }},
        icon: 'icon-plus'
      }
    ]
  },
  {
    name: 'Tessere',
    url: '/tessere',
    icon: 'cil-contact',
    children: [
      {
        name: 'Lista Tesserati',
        url: '/tessere',
        icon: 'cil-contact'
      },
      {
        name: 'Aggiungi un tesserato',
        url: '/tessereNew',
        linkProps: { queryParams: { 'new' : true }},
        icon: 'icon-plus'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Gestione Eventi',
  },
  {
    name: 'Manifestazioni',
    url: '/manifestazioni',
    icon: 'cil-calendar',
    children: [
      {
        name: 'Lista Eventi',
        url: '/manifestazioni',
        icon: 'cil-calendar'
      },
      {
        name: 'Lista partecipanti',
        url: '/partecipanti',
        icon: 'icon-people'
      },
      {
        name: 'Aggiungi Evento',
        url: '/manifestazioniNew',
        linkProps: { queryParams: { 'new' : true }},
        icon: 'cil-note-add'
      },
      {
        name: 'Aggiungi partecipante',
        url: '/partecipantiNew',
        linkProps: { queryParams: { 'new' : true }},
        icon: 'icon-plus'
      }
    ]
  }
];
