import { Prisma, WordType } from '@prisma/client';
import { folders } from './folder.seed';

const wordsData = [
  {
    word: 'test',
    translation: 'тест',
    definition:
      'A way of discovering, by questions or practical activities, what someone knows, or what someone or something can do or is like.',
    sentences: [
      'The class are having a spelling __ today.',
      'She had to take an aptitude __ before she got the job.',
      "The doctors have done some __s to try and find out what's wrong with her.",
    ],
    type: WordType.NOUN,
  },
  {
    word: 'telephone',
    translation: 'телефон',
    definition:
      'A piece of electronic equipment that makes it possible for you to speak to someone in another place who has similar equipment.',
    sentences: [
      'She spends hours and hours on the __.',
      'She hurried to answer the __.',
      'I like to have a __ at my bedside.',
    ],
    type: WordType.NOUN,
  },
];

export const words: Prisma.WordUpsertArgs['create'][] = [];

wordsData.forEach((wordData, index) => {
  folders.forEach((folder, i) => {
    const id = `9e391faf-64b2-4d4c-b879-463532920f${index}${i}`;
    words.push({
      id,
      ...wordData,
      folderId: folder.id,
    });
  });
});
