import { Endpoint } from './client';

export interface EventInfoReq {
  EventID: number;
}

export interface EventInfoRes {
  imageUrl: string;
  title: string;
  startTime: string;
  endTime?: string;
  location: string;
  description: string;
  more:
    | {
        // lecture
        type: 'l';
        lecturers: {
          photoUrl: string;
          personName: string;
          description: string;
        }[];
      }
    | {
        // salon
        type: 's';
        schedules: {
          personName: string;
          description: string;
          startTime: string;
          title: string;
        }[];
      }
    | {
        // hackathon
        type: 'h';
        description: string;
      };
}

export default {
  Info: {
    GetEventInfo: 'events/Info.GetEventInfo' as Endpoint<
      EventInfoReq,
      EventInfoRes
    >,
  },
};
