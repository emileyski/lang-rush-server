import { Prisma } from '@prisma/client';

export const words: Prisma.WordUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fw1',
    word: 'test',
    translation: 'тест',
    definition:
      'A way of discovering, by questions or practical activities, what someone knows, or what someone or something can do or is like.',
    sentences: [
      'The class are having a spelling __ today.',
      'She had to take an aptitude __ before she got the job.',
      "The doctors have done some __s to try and find out what's wrong with her.",
    ],
    folderId: '9e391faf-64b2-4d4c-b879-463532920ff1',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fw2',
    word: 'telephone',
    translation: 'телефон',
    definition:
      'A piece of electronic equipment that makes it possible for you to speak to someone in another place who has similar equipment.',
    sentences: [
      'She spends hours and hours on the __.',
      'She hurried to answer the __.',
      'I like to have a __ at my bedside.',
    ],
    folderId: '9e391faf-64b2-4d4c-b879-463532920ff1',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fw3',
    word: 'test',
    translation: 'тест',
    definition:
      'A way of discovering, by questions or practical activities, what someone knows, or what someone or something can do or is like.',
    sentences: [
      'The class are having a spelling __ today.',
      'She had to take an aptitude __ before she got the job.',
      "The doctors have done some __s to try and find out what's wrong with her.",
    ],
    folderId: '9e391faf-64b2-4d4c-b879-463532920ff3',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fw4',
    word: 'telephone',
    translation: 'телефон',
    definition:
      'A piece of electronic equipment that makes it possible for you to speak to someone in another place who has similar equipment.',
    sentences: [
      'She spends hours and hours on the __.',
      'She hurried to answer the __.',
      'I like to have a __ at my bedside.',
    ],
    folderId: '9e391faf-64b2-4d4c-b879-463532920ff3',
  },
];
