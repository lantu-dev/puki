import {
  GetAnswersListReq,
  GetAnswersListRes,
  GetQuestionsListReq,
  GetQuestionsListRes,
} from '@/api-client/events';
// @ts-ignore
import Mock from 'mockjs';

export default {
  GetQuestionsList: (params: GetQuestionsListReq): GetQuestionsListRes => {
    return Mock.mock({
      'res|3-10': [
        {
          question: '@cparagraph(1,3)',
          questionID: /[0-9a-zA-Z]{8}/,
          questioner: '@cname',
          time: '@datetime',
          Title: '@cword(2,6)',
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
