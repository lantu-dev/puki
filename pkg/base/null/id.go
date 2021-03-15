package null

import (
	"encoding/json"
	"github.com/lantu-dev/puki/pkg/base"
	"gopkg.in/guregu/null.v4"
	"strconv"
)

type ID null.Int

func IDFrom(i base.ID) ID {
	return ID(null.IntFrom(int64(i)))
}

func NewID(i base.ID, valid bool) ID {
	return ID(null.NewInt(int64(i), valid))
}

func (i ID) MarshalJSON() ([]byte, error) {
	if !i.Valid {
		return []byte("null"), nil
	}
	return json.Marshal(strconv.FormatInt(i.Int64, 10))
}

func (i *ID) UnmarshalJSON(data []byte) error {
	return (*null.Int)(i).UnmarshalJSON(data)
}

func (i *ID) UnmarshalText(text []byte) error {
	return (*null.Int)(i).UnmarshalText(text)
}

func (i ID) MarshalText() ([]byte, error) {
	return (null.Int)(i).MarshalText()
}

// SetValid changes this Int's value and also sets it to be non-null.
func (i *ID) SetValid(n base.ID) {
	(*null.Int)(i).SetValid(int64(n))
}

func (i ID) IsZero() bool {
	return (null.Int)(i).IsZero()
}

func (i ID) Equal(other ID) bool {
	return (null.Int)(i).Equal((null.Int)(other))
}

func (i ID) ValueOrZero() base.ID {
	return base.ID((null.Int)(i).ValueOrZero())
}
