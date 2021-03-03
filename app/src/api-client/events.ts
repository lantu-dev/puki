import { Endpoint } from './client';

export enum EventType {
  EventTypeNull,
  EventTypeOther,
  EventTypeSalon,
  EventTypeLecture,
  EventTypeHackathon,
}

interface Event {
  ID: number;
  Organizer: string;
  Title: string;
  Description: string;
  ImageUrl: string;
  StartedAt: string;
  EndedAt: string;
  Location: string;
  EventType: number;
}
export interface GetEventsListReq {
  EventIDs: number[];
}
export type GetEventsListRes = Event[];

interface LectureInfo {
  EventType: EventType.EventTypeLecture;
  Schedules: {
    Title: string;
    StartedAt: string;
    EndedAt: string;
    TalkerName: string;
    TalkerTitle: string;
    TalkerAvatarURL: string;
    TalkerDescription: string;
  }[];
}
interface SalonInfo {
  EventType: EventType.EventTypeSalon;
  Schedules: {
    Title: string;
    StartedAt: string;
    EndedAt: string;
    TalkerName: string;
    TalkerTitle: string;
    TalkerAvatarURL: string;
    TalkerDescription: string;
  }[];
}
interface HackathonInfo {
  EventType: EventType.EventTypeHackathon;
  Hackathon: {
    Steps: string;
  };
}
export interface EventMoreInfoReq {
  EventID: number;
}
export type EventMoreInfoRes = LectureInfo | SalonInfo | HackathonInfo;

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

export interface GetQuestionsListReq {
  eventID: string;
}
export type GetQuestionsListRes = QuestionInfo[];

export interface GetAnswersListReq {
  questionID: string;
}
export type GetAnswersListRes = AnswerInfo[];

export default {
  EventService: {
    GetEventsList: 'events/EventService.GetEventsList' as Endpoint<
      GetEventsListReq,
      GetEventsListRes
    >,
    GetEventMoreInfo: 'events/EventService.GetEventMoreInfo' as Endpoint<
      EventMoreInfoReq,
      EventMoreInfoRes
    >,
  },
  QuestionService: {
    GetQuestionsList: 'events/QuestionService.GetQuestionsList' as Endpoint<
      GetQuestionsListReq,
      GetQuestionsListRes
    >,
    GetAnswersList: 'events/QuestionService.GetAnswersList' as Endpoint<
      GetAnswersListReq,
      GetAnswersListRes
    >,
  },
};
