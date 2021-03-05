package base

import (
	"github.com/sony/sonyflake"
	"time"
)

var sonyFlake = sonyflake.NewSonyflake(sonyflake.Settings{StartTime: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)})

// GenerateID an unique int64 ID
func GenerateID() int64 {
	id, err := sonyFlake.NextID()
	if err != nil {
		panic(err)
	} else {
		return int64(id)
	}
}

//const CHARS = "cdi0kleno1ahx_yp2qrsbgjm3utf4vwz"
//func NamedID(name string) int64 {
//  name = strings.ToLower(name)
//}
