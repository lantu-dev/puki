package base

import "github.com/sony/sonyflake"

var sonyFlake = sonyflake.NewSonyflake(sonyflake.Settings{})

// GenerateID an unique int64 ID
func GenerateID() int64 {
	id, err := sonyFlake.NextID()
	if err != nil {
		panic(err)
	} else {
		return int64(id)
	}
}
