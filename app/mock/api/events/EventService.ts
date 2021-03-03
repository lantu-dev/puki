import {
  EventMoreInfoReq,
  EventMoreInfoRes,
  GetEventsListReq,
  GetEventsListRes,
} from '@/api-client/events';
// @ts-ignore
import Mock from 'mockjs';

enum EventType {
  EventTypeNull,
  EventTypeOther,
  EventTypeSalon,
  EventTypeLecture,
  EventTypeHackathon,
}

export default {
  GetEventsList: (params: GetEventsListReq): GetEventsListRes => {
    let IDs = params.EventIDs.length
      ? params.EventIDs
      : (Mock.mock({
          'IDs|0-10': ['@natural'],
        }).IDs as number[]);
    return IDs.map((ID) =>
      Mock.mock({
        ID,
        Organizer: '@cword(4,10)',
        Title: '@cword(4,10)',
        Description: '@cparagraph',
        ImageUrl: '@image',
        StartedAt: '@datetime',
        EndedAt: '@datetime',
        Location: '@county(true)',
        'EventType|1': [
          EventType.EventTypeHackathon,
          EventType.EventTypeLecture,
          EventType.EventTypeSalon,
        ],
      }),
    );
  },
  GetEventMoreInfo: (params: EventMoreInfoReq): EventMoreInfoRes => {
    return Mock.mock({
      'more|1': [
        {
          'EventType|1': [EventType.EventTypeLecture, EventType.EventTypeSalon],
          'Schedules|2-4': [
            {
              Title: '@cword(2,6)',
              StartedAt: '@datetime',
              EndedAt: '@datetime',
              TalkerTitle: '@cword(2,6)',
              TalkerName: '@cname',
              TalkerDescription: '@cparagraph(1,5)',
              TalkerAvatarURL: '@image',
            },
          ],
        },
        {
          EventType: EventType.EventTypeHackathon,
          Hackathon: [{ Steps: '@cparagraph' }],
        },
      ],
    }).more;
  },
};
