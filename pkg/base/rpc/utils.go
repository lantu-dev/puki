package rpc

import (
	"encoding/binary"
	"github.com/lantu-dev/puki/pkg/base"
	uuid "github.com/satori/go.uuid"
	"net/http"
	"reflect"
	"strconv"
	"unicode"
	"unicode/utf8"
)

type Empty struct {
}

// isExported returns true of a string is an exported (upper case) name.
func isExported(name string) bool {
	rune, _ := utf8.DecodeRuneInString(name)
	return unicode.IsUpper(rune)
}

func typeIsExported(t reflect.Type) bool {
	for t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	return isExported(t.Name())
}

func ReqIDFromRequest(r *http.Request) uuid.UUID {
	var id = make([]byte, 16)
	cid, _ := strconv.ParseInt(r.Header.Get("x-request-id"), 10, 32)
	binary.LittleEndian.PutUint64(id, uint64(cid))
	binary.LittleEndian.PutUint64(id[8:], uint64(base.GenerateID()))
	return uuid.FromBytesOrNil(id)
}
