export type QuizQuestion = {
  text: string;
  options: string[];
  correctIndex: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    text: 'Quelle est la capitale du Sénégal ?',
    options: ['Bamako', 'Dakar', 'Abidjan', 'Conakry'],
    correctIndex: 1,
  },
  {
    text: 'Quel pays africain a remporté la CAN 2017 ?',
    options: ['Cameroun', 'Égypte', 'Ghana', 'Nigéria'],
    correctIndex: 0,
  },
  {
    text: 'Quel fleuve traverse l\'Égypte ?',
    options: ['Le Congo', 'Le Niger', 'Le Nil', 'Le Zambèze'],
    correctIndex: 2,
  },
  {
    text: 'Quelle est la plus grande ville du Cameroun ?',
    options: ['Yaoundé', 'Bafoussam', 'Douala', 'Garoua'],
    correctIndex: 2,
  },
  {
    text: 'Qui a composé l\'hymne national « O Cameroon, Berceau de nos Ancêtres » ?',
    options: ['Manu Dibango', 'René Djam Afame', 'Richard Bona', 'Francis Bebey'],
    correctIndex: 1,
  },
  {
    text: 'Quel pays africain est surnommé « le géant de l\'Afrique » ?',
    options: ['Soudan', 'Algérie', 'Nigéria', 'RD Congo'],
    correctIndex: 2,
  },
  {
    text: 'Dans quelle ville se trouve le siège de l\'Union Africaine ?',
    options: ['Le Caire', 'Addis-Abeba', 'Nairobi', 'Pretoria'],
    correctIndex: 1,
  },
  {
    text: 'Quel produit est le principal exportateur du Cacao mondial ?',
    options: ['Ghana', 'Côte d\'Ivoire', 'Cameroun', 'Nigéria'],
    correctIndex: 1,
  },
  {
    text: 'Quel mont est le plus haut d\'Afrique ?',
    options: ['Mont Kenya', 'Mont Meru', 'Kilimandjaro', 'Rwenzori'],
    correctIndex: 2,
  },
  {
    text: 'Quelle est la monnaie officielle du Cameroun ?',
    options: ['Naira', 'Franc CFA', 'Dinar', 'Shilling'],
    correctIndex: 1,
  },
];
