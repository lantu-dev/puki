package services

import (
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/bbs/models"
	"gorm.io/gorm"
)

type NodeService struct {
	db *gorm.DB
}

func NewNodeService(db *gorm.DB) *NodeService {
	return &NodeService{db}
}

type GetNodeReq struct {
	// 0 for list all top level-nodes
	ID base.ID
}

type GetNodeRes struct {
	Node     *models.Node
	Children []models.Node
}

func (s *NodeService) GetNode(ctx *rpc.Context, req *GetNodeReq, res *GetNodeRes) (err error) {

	tx := s.db.Begin()

	// First, determine req.ID == 0 or not
	if req.ID == 0 {
		// We should query all node that it's ParentID == 0
		res.Children = models.ListNodeChildren(tx, 0)
	} else {
		// Else we should get the node object with ID == `req.ID` from db then fetch all its children.
		res.Node = models.GetNodeByID(tx, req.ID)
		if res.Node == nil {
			return base.UserErrorf(nil, "node %d not found", req.ID)
		}
		res.Children = models.ListNodeChildren(tx, req.ID)
	}

	err = tx.Commit().Error
	return
}
