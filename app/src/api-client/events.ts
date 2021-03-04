import {Endpoint} from './client';

interface EventBriefInfo {
  description: string;
  eventID: string;
  imageUrl: string;
  title: string;
  type: 'l' | 's' | 'h';
}

interface EventMoreInfo extends EventBriefInfo {
  endTime?: string;
  location: string;
  startTime: string;
}

interface LectureInfo extends EventMoreInfo {
  type: 'l';
  lecturers: {
    photoUrl: string;
    personName: string;
    description: string;
  }[];
}

interface SalonInfo extends EventMoreInfo {
  type: 's';
  schedules: {
    personName: string;
    description: string;
    startTime: string;
    title: string;
  }[];
}

interface HackathonInfo extends EventMoreInfo {
  type: 'h';
  steps: string;
}

export interface QuestionInfo {
  questionID: string;
  question: string;
  questioner: string;
  time: string;
  title: string;
}

export interface AnswerInfo {
  answerID: string;
  replyer: string;
  content: string;
  time: string;
}

export interface GetEventsListReq {
}

export type GetEventsListRes = EventBriefInfo[];

export interface EventMoreInfoReq {
  eventID: string;
}

export type EventMoreInfoRes = LectureInfo | SalonInfo | HackathonInfo;

export interface GetQuestionsListReq {
  eventID: string;
}

export type GetQuestionsListRes = QuestionInfo[];

export interface GetAnswersListReq {
  questionID: string;
}

export type GetAnswersListRes = AnswerInfo[];

export default {
  Info: {
    GetEventsList: 'events/Info.GetEventsList' as Endpoint<{},
      GetEventsListRes>,
    GetEventMoreInfo: 'events/Info.GetEventMoreInfo' as Endpoint<EventMoreInfoReq,
      EventMoreInfoRes>,
    GetQuestionsList: 'events/Info.GetQuestionsList' as Endpoint<GetQuestionsListReq,
      GetQuestionsListRes>,
    GetAnswersList: 'events/Info.GetAnswersList' as Endpoint<GetAnswersListReq,
      GetAnswersListRes>,
  },
};
