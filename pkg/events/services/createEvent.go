package services

import "gorm.io/gorm"

type CreateEventService struct {
	db *gorm.DB
}

func NewCreateEventService(db *gorm.DB) *CreateEventService {
	return &CreateEventService{db: db}
}
