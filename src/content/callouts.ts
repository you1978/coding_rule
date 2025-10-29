import { ReactNode } from 'react';

type CalloutExample = {
  id: string;
  title?: string;
  tone?: 'info' | 'warning' | 'success' | 'danger';
  content: ReactNode;
};

export const exampleCallouts: CalloutExample[] = [
  {
    id: 'example-1',
    content: 'これは伏せ字のテキストでございます。',
  },
  {
    id: 'example-2',
    title: '重要',
    tone: 'warning',
    content: 'これは重要な注意書きです。',
  },
  {
    id: 'example-3',
    title: '成功',
    tone: 'success',
    content: '操作が正常に完了しました。',
  },
];
