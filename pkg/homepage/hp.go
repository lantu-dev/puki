package homepage

import "net/http"

type UserService struct {
}

type LoginReq struct {
	UserName string
	Password string
}

type LoginRes struct {
	Token string
}

func (s *UserService) Login(r *http.Request, req *LoginReq, res *LoginRes) error {
	if req.UserName == "admin" && req.Password == "admin" {
		res.Token = "success"
	} else {
		res.Token = "fail"
	}

	return nil
}
