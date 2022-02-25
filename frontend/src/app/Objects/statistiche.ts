export interface Statistiche{
  manifestazioniAnnoCorrente?:number;
  manifestazioniAnnoPrecedente?:number;
  partecipantiAnnoCorrente?:number;
  partecipantiAnnoPrecedente?:number;
  membriAnnoPrecedente?:number;
  membriAnnoCorrente?:number;
  autoRegistrateAnnoPrecedente?:number;
  autoRegistrateAnnoCorrente?:number;
  autoAnticheRegistrateAnnoPrecedente?:number;
  autoAnticheRegistrateAnnoCorrente?:number;
  tesseratiAnnoPrecedente?:number;
  tesseratiAnnoCorrente?:number;
  visitatoriAnnoPrecedente?:number;
  visitatoriAnnoCorrente?:number;

  nuoviMembriPerMeseAnnoPrecedente?:number[];
  nuoviMembriPerMeseAnnoCorrente?:number[];

}
