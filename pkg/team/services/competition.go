package models

import (
	"github.com/lantu-dev/puki/pkg/team/models"
	"net/http"
)

type CompetitionService struct {
}

//请求
type GetCompetitionReq struct {
}

//响应
type GetCompetitionRes struct {
}

//获取所有比赛的信息
func (c *CompetitionService) GetCompetition(r *http.Request,
	req *GetCompetitionReq, res *GetCompetitionRes) error {

	return nil
}
