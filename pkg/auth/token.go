/* 通证 ( Token ) 相关。

通证 ( Token ): 当客户端用户登陆成功后，系统会向该客户端用户签发一定有效期的 token，之后客户端用户每次请求的时候，都需要在请求头部携带该 token，
以标示自己的用户身份。

*/
package auth

import (
	"encoding/json"
	"github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	//"net/http"
)

// TokenUser: 编码在 token 字符串中的用户信息
type TokenUser struct {
	// 用户 ID
	ID int64 `json:"i"`

	// Token 失效时间
	ExpiresAt int64 `json:"e"`

	// 用户角色
	Roles []int64 `json:"r"`

	// 用户权限
	Perms    []int64 `json:"p"`
	Settings int64   `json:"s"`
}

// 是否是匿名用户 （即未登陆用户）
func (u *TokenUser) IsAnon() bool {
	return u.ID == 0
}

// 使用 TokenUser 获取 models.User
func (u *TokenUser) User(tx *gorm.DB) *models.User {
	var user models.User
	err := tx.First(&user, u.ID).Error
	if err != nil {
		log.Fatal("bad TokenUser: ", err)
	}
	return &user
}

// 从 models.User 获得 TokenUser
func NewTokenUser(u *models.User) (*TokenUser, error) {
	user := &TokenUser{
		ID:    int64(u.ID),
		Roles: make([]int64, 0),
		Perms: make([]int64, 0),
	}

	return user, nil
}

// http.Request 中解析 TokenUser
func ExtractTokenUser(ctx *rpc.Context) (user TokenUser, err error) {
	auth := ctx.Request.Header.Get("Authorization")
	err = json.Unmarshal([]byte(auth), &user)
	return
}

func (t *TokenUser) Encode() string {
	data, err := json.Marshal(t)
	if err != nil {
		log.Panicf("json marshal error")
	}
	return string(data)
}
