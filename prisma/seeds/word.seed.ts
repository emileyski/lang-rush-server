import { Prisma, WordForm } from '@prisma/client';
import { folders } from './folder.seed';

const region = process.env.AWS_REGION || '';
const bucket = process.env.AWS_BUCKET_NAME || '';

const wordsData = [
  {
    word: 'test',
    translation: 'тест',
    definition:
      'A way of discovering, by questions or practical activities, what someone knows, or what someone or something can do or is like.',
    sentences: [
      'The class are having a spelling test today.',
      'She had to take an aptitude test before she got the job.',
      "The doctors have done some tests to try and find out what's wrong with her.",
    ],
    form: WordForm.NOUN,
    audioUrl: `https://${bucket}.s3.${region}.amazonaws.com/test.mp3`,
  },
  {
    word: 'telephone',
    translation: 'телефон',
    definition:
      'A piece of electronic equipment that makes it possible for you to speak to someone in another place who has similar equipment.',
    sentences: [
      'She spends hours and hours on the telephone.',
      'She hurried to answer the telephone.',
      'I like to have a telephone at my bedside.',
    ],
    audioUrl: `https://${bucket}.s3.${region}.amazonaws.com/telephone.mp3`,
    form: WordForm.NOUN,
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
