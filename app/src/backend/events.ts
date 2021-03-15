import { Endpoint } from '.';

export enum EventType {
  EventTypeNull,
  EventTypeOther,
  EventTypeSalon,
  EventTypeLecture,
  EventTypeHackathon,
}

export interface Event {
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
export interface GetEventsListRes {
  Events: Event[];
}

export interface LectureInfo {
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
export interface SalonInfo {
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
export interface HackathonInfo {
  Hackathon: {
    Steps: string;
  };
}
export interface EventMoreInfoReq {
  EventID: number;
}
export type EventMoreInfoRes = LectureInfo | SalonInfo | HackathonInfo;

export interface EnrollForEventReq {
  EventID: number;
}
export interface EnrollForEventRes {
  Status: number;
}

export interface QuitEventReq {
  EventID: number;
}
export interface QuitEventRes {
  Status: number;
}

export interface GetUserEnrolledEventsReq {}
export interface GetUserEnrolledEventsRes {
  Events: Event[];
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
    EnrollForEvent: 'events/EventService.EnrollForEvent' as Endpoint<
      EnrollForEventReq,
      EnrollForEventRes
    >,
    QuitEvent: 'events/EventService.QuitEvent' as Endpoint<
      QuitEventReq,
      QuitEventRes
    >,
    GetUserEnrolledEvents: 'events/EventService.GetUserEnrolledEvents' as Endpoint<
      GetUserEnrolledEventsReq,
      GetUserEnrolledEventsRes
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
