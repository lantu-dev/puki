package hwcloud

import (
	"crypto/sha256"
	"crypto/tls"
	"encoding/base64"
	"encoding/json"
	"github.com/juju/errors"
	"github.com/pochard/commons/randstr"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"
)

func smsBuildWSSEHeader(appKey string, appSecret string) string {
	layout := "2006-01-02T15:04:05Z"        // 小知识：这个时间是golang的诞生时间
	now := time.Now().Format(layout)        // 随机数生成时间，采用标准UTC格式
	Nonce := randstr.RandomAlphanumeric(64) // 客户端发送请求时生成的随机数，可包含数字或大小写字母；文档要求长度1~128位，这里为了简单直接定死长度为64
	password := Nonce + now + appSecret
	digest := sha256.Sum256([]byte(password))
	PasswordDigest := string(base64.StdEncoding.EncodeToString(digest[:])) // 使用Nonce、Created、Password拼接后的字符串进行SHA256加密
	return "UsernameToken Username=\"" + appKey + "\", PasswordDigest=\"" + PasswordDigest + "\", Nonce=\"" + Nonce + "\", Created=\"" + now + "\""
}

type SMSSender struct {
	URL       string // APP接入地址+接口访问URI
	AppKey    string
	AppSecret string
	Channel   string // 参数Channel为通道号，短信平台为短信签名分配的通道号码。
	Signature string // 参数signature为签名名称，必须是已审核通过的，与模板类型一致的签名名称。
}

// 短信ID列表，当目的号码存在多个时，每个号码都会返回一个SmsID。
type SMSId struct {
	SMSMsgId   string // 短信的唯一标识。
	From       string // 短信发送方的号码。
	OriginTo   string // 短信接收方的号码。
	Status     string // 短信状态码, API错误码：https://support.huaweicloud.com/devg-msgsms/sms_04_0009.html
	CreateTime string // 短信资源的创建时间，即短信平台接收到客户发送短信请求的时间，为UTC时间。格式为：yyyy-MM-dd'T'HH:mm:ss'Z'。
}

// 响应结果参数
type smsResp struct {
	code        string // 请求返回的结果码。
	description string // 请求返回的结果码描述。
	result      SMSId
}

// 参数templateID为短信模板ID，用于唯一标识短信模板，在申请短信模板时获取模板ID。位置：签名管理 - 通道号
// 参数to, 字符串类型，表示接收者电话号码，多个号码之间用英文逗号隔开；
// 示例："+8615123456789,+8615234567890"
// 参数params为短信模板变量数组，用于依次填充“templateID”参数指定的模板内容中的变量，该参数需填写为JSONArray格式。
func (h *SMSSender) SendMessage(templateID, to string, params ...string) (smsID *SMSId, err error) {
	//  https://support.huaweicloud.com/api-msgsms/sms_05_0001.html
	//  now print everything to console

	tr := &http.Transport{
		// 为防止因HTTPS证书认证失败造成API调用失败，设置忽略证书信任问题
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	// 为了控制客户端标题，创建客户端并使用NewRequest而非PostForm
	client := &http.Client{
		Transport: tr,
	}
	// body
	paras, err := json.Marshal(params)
	form := url.Values{
		"From":          {h.Channel},
		"to":            {to},
		"templateId":    {templateID},
		"templateParas": {string(paras)},
	}
	req, err := http.NewRequest("POST", h.URL+"/sms/batchSendSms/v1", strings.NewReader(form.Encode()))
	if err != nil {

		return nil, errors.Trace(err)
	}
	// 设置Header; 注意Set和Add
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Authorization", "WSSE realm=\"SDP\",profile=\"UsernameToken\",type=\"Appkey\"")
	req.Header.Add("X-WSSE", smsBuildWSSEHeader(h.AppKey, h.AppSecret))
	resp, err := client.Do(req)
	if err != nil {

		return nil, errors.Trace(err)
	}

	//spew.Dump(content)
	//sms := content.result
	dat, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		return nil, err
	}
	var content smsResp
	err = json.Unmarshal(dat, &content)
	if err != nil {
		return nil, err
	}
	log.Infof("hwcloud sms resp: %s", string(dat))

	return &content.result, errors.Trace(err)
}
