import { Endpoint } from '.';
export interface BasicInfo{
    ClassPic: string;
	ClassNumber :number;
    AcademyName: string;
    Recorder: string;
    RecorderID: string;
    StudentNum: number;
	StudentHere: number;
}
export interface ClassBuild{
    ClassNumber: number;
	//班长
	Monitor :  string;
    MonitorID: number;
	//团支书
    LeagueBranchSecretary: string;
	LeagueBranchSecretaryID:number;
	//学委
    StudyCom: string;
    StudyComID: number;
	//组织委员
	OrganizeCom  : string;
    OrganizeComID: number;
	//劳委
    LaborCom: string;
    LaborComID: number;
	//文娱委员
    EntertainCom: string;
    EntertainComID: number;
	//体委
	SportCom: string;
	SportComID: number;
	//科技委员
	TechCom: string;
	TechComID: number;
}
export interface PartyBuild{
    ClassNumber : number;
	NumberInParty: number;
	NumberWillInParty: number;
}
export interface PersonalInfo{
    ID: number;
	//姓名
	Name: string;
	ClassNum: number;
	//群众，共青团团员，预备党员或者党员
	Identity: string;
	IDNumber: string;
	PhoneNum: number;
	ParentPhoneNum: number;
	//家庭住址
	LivingLocation: string;
	VolenteerTime: number;
	VolunteerProjectNum: number;
}
export interface GetBasicInfoReq{
    ID: string;
}
export interface GetBasicInfoRes{
    BasicInfo:BasicInfo;
}
export interface ModifyRecorderreq{
    ClassNumber: number;
	NewRecorder: string;
}
export interface ModifyRecorderres{
    IsFailed: boolean;
}
export interface UpstateStuNumreq{
    ClassNumber: number;
	NewStudentNum: number;
}
export interface UpstateStuNumres{
    IsFailed: boolean;
}
export interface UpstateStuHerereq{
    ClassNumber: number;
    NewStudentNum: number;
}
export interface UpstateStuHereres{
    IsFailed: boolean;
}