import { Endpoint } from '.';

export interface INode {
  ID: number;
  ParentID?: number;

  // An unique name for this node, or empty.
  Name?: string;

  // The display name for this node
  Title: string;

  // If the node is created by a user, this field will be filled.
  UserID?: number;
  ThreadsCount: number;
  AvatarURL: string;
  Description: string;
  CreatedAt: Date;
  DeletedAt: Date;
}

export interface GetNodeReq {
  // 0 for list all top level-nodes
  ID: number;
}

export interface GetNodeRes {
  Node?: INode;
  Children: INode[];
}

export interface IThread {
  ID: number;
  UserID: number;
  NodeID: number;
  ReplyForID: number;
  //HotReplyUserID int64
  //HotReplyAbstract string
  RepliesCount: number;
  Title: string;
  Abstract: string;
  Content: string;
  ImagesURL: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface ListThreadsReq {
  NodeID: number;

  // 0 for list all non-reply threads
  ID: number;

  // `UpdatedBefore` & `Limit` are used for pagination
  UpdatedBefore?: Date;
  Limit: number;
}

export interface ListThreadsRes {
  Threads: IThread[];
}

export interface GetThreadReq {
  NodeID: number;
  ID: number;
}

export interface GetThreadRes {
  Thread: IThread;
}

export interface CreateThreadReq {
  NodeID: number;
  ReplyForID: number;
  Title: string;
  Abstract: string;
  Content: string;
}

export interface CreateThreadRes {
  Thread: IThread;
}

export const NodeService = {
  GetNode: 'bbs/NodeService.GetNode' as Endpoint<GetNodeReq, GetNodeRes>,
};
export const ThreadService = {
  CreateThread: 'bbs/ThreadService.CreateThread' as Endpoint<
    CreateThreadReq,
    CreateThreadRes
  >,
  GetThread: 'bbs/ThreadService.GetThread' as Endpoint<
    GetThreadReq,
    GetThreadRes
  >,
  ListThreads: 'bbs/ThreadService.ListThreads' as Endpoint<
    ListThreadsReq,
    ListThreadsRes
  >,
};
