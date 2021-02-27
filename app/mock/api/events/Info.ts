import {
  GetEventsListRes,
  EventMoreInfoReq,
  EventMoreInfoRes,
  GetAnswersListReq,
  GetAnswersListRes,
  GetQuestionsListReq,
  GetQuestionsListRes,
} from '@/api-client/events';
// @ts-ignore
import Mock from 'mockjs';

export default {
  GetEventsList: (params: {}): GetEventsListRes =>
    Mock.mock({
      'res|3-10': [
        {
          description: '@cparagraph',
          eventID: /[0-9a-zA-Z]{8}/,
          imageUrl: '@image',
          title: '@cword(4,10)',
          type: ['l', 's', 'h'],
        },
      ],
    }).res,
  GetEventMoreInfo: (params: EventMoreInfoReq): EventMoreInfoRes => {
    return Mock.mock({
      description: '@cparagraph',
      endTime: '@datetime',
      eventID: params.eventID,
      imageUrl: '@image',
      location: '@county(true)',
      startTime: '@datetime',
      title: '@cword(4,10)',
      ...Mock.mock({
        'more|1': [
          {
            type: 'l',
            'lecturers|2-4': [
              {
                description: '@cparagraph(1,5)',
                personName: '@cname',
                photoUrl: '@image',
              },
            ],
          },
          {
            type: 's',
            'schedules|2-4': [
              {
                description: '@cparagraph(1,3)',
                personName: '@cname',
                startTime: '@datetime',
                title: '@cword(2,6)',
              },
            ],
          },
          {
            description: '@cparagraph',
            type: 'h',
          },
        ],
      }).more,
    });
  },
  GetQuestionsList: (params: GetQuestionsListReq): GetQuestionsListRes => {
    return Mock.mock({
      'res|3-10': [
        {
          question: '@cparagraph(1,3)',
          questionID: /[0-9a-zA-Z]{8}/,
          questioner: '@cname',
          time: '@datetime',
          title: '@cword(2,6)',
        },
      ],
    }).res;
  },
  GetAnswersList: (params: GetAnswersListReq): GetAnswersListRes => {
    return Mock.mock({
      'res|0-5': [
        {
          answerID: /[0-9a-zA-Z]{8}/,
          content: '@cparagraph',
          replyer: '@cname',
          time: '@datetime',
        },
      ],
    }).res;
  },
};
