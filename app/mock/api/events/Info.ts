import { EventInfoReq, EventInfoRes } from '@/api-client/events';
// @ts-ignore
import Mock from 'mockjs';

export default {
  GetEventInfo: (param: EventInfoReq): EventInfoRes => {
    return Mock.mock({
      imageUrl: '@image',
      title: '@cword(4,10)',
      startTime: '@datetime',
      endTime: '@datetime',
      location: '@county(true)',
      description: '@cparagraph',
      'more|1': [
        {
          type: 'l',
          'lecturers|2-4': [
            {
              photoUrl: '@image',
              personName: '@cname',
              description: '@cparagraph(1,5)',
            },
          ],
        },
        {
          type: 's',
          'schedules|2-4': [
            {
              personName: '@cname',
              description: '@cparagraph(1,3)',
              startTime: '@datetime',
              title: '@cword(2,6)',
            },
          ],
        },
        {
          type: 'h',
          description: '@cparagraph',
        },
      ],
    });
  },
  GetQuestionInfo: (param: { QuestionID: number }) => {
    return Mock.mock({
      title: '问题摘要',
      date: '日期',
      question: '问题描述',
      questioner: '提问者XXX',
    });
  },
};
