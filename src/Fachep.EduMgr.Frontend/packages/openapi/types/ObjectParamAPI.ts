import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import { ClassDto } from '../models/ClassDto';
import { ConfigDto } from '../models/ConfigDto';
import { CourseDto } from '../models/CourseDto';
import { DayOfWeek } from '../models/DayOfWeek';
import { DepartmentDto } from '../models/DepartmentDto';
import { EnrollmentDto } from '../models/EnrollmentDto';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResult } from '../models/LoginResult';
import { MajorDto } from '../models/MajorDto';
import { OrderByColumn } from '../models/OrderByColumn';
import { ResetPasswordResponse } from '../models/ResetPasswordResponse';
import { ScheduleDto } from '../models/ScheduleDto';
import { SectionInfo } from '../models/SectionInfo';
import { StudentDto } from '../models/StudentDto';
import { SubjectDto } from '../models/SubjectDto';
import { TeacherDto } from '../models/TeacherDto';
import { UserDto } from '../models/UserDto';
import { UserProfile } from '../models/UserProfile';
import { UserRole } from '../models/UserRole';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiAuthChangePasswordRequest {
    /**
     * 
     * @type ChangePasswordRequest
     * @memberof AuthApiauthChangePassword
     */
    changePasswordRequest?: ChangePasswordRequest
}

export interface AuthApiAuthForceResetPasswordRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AuthApiauthForceResetPassword
     */
    userId?: number
}

export interface AuthApiAuthLoginRequest {
    /**
     * 
     * @type LoginRequest
     * @memberof AuthApiauthLogin
     */
    loginRequest?: LoginRequest
}

export interface AuthApiAuthLogoutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthLogout
     */
    deviceId?: string
}

export interface AuthApiAuthRefreshRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthRefresh
     */
    deviceId?: string
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public authChangePasswordWithHttpInfo(param: AuthApiAuthChangePasswordRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.authChangePasswordWithHttpInfo(param.changePasswordRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authChangePassword(param: AuthApiAuthChangePasswordRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.authChangePassword(param.changePasswordRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authForceResetPasswordWithHttpInfo(param: AuthApiAuthForceResetPasswordRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<ResetPasswordResponse>> {
        return this.api.authForceResetPasswordWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authForceResetPassword(param: AuthApiAuthForceResetPasswordRequest = {}, options?: ConfigurationOptions): Promise<ResetPasswordResponse> {
        return this.api.authForceResetPassword(param.userId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authLoginWithHttpInfo(param: AuthApiAuthLoginRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<LoginResult>> {
        return this.api.authLoginWithHttpInfo(param.loginRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authLogin(param: AuthApiAuthLoginRequest = {}, options?: ConfigurationOptions): Promise<LoginResult> {
        return this.api.authLogin(param.loginRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authLogoutWithHttpInfo(param: AuthApiAuthLogoutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.authLogoutWithHttpInfo(param.deviceId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authLogout(param: AuthApiAuthLogoutRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.authLogout(param.deviceId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authRefreshWithHttpInfo(param: AuthApiAuthRefreshRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<LoginResult>> {
        return this.api.authRefreshWithHttpInfo(param.deviceId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public authRefresh(param: AuthApiAuthRefreshRequest = {}, options?: ConfigurationOptions): Promise<LoginResult> {
        return this.api.authRefresh(param.deviceId,  options).toPromise();
    }

}

import { ObservableClassesApi } from "./ObservableAPI";
import { ClassesApiRequestFactory, ClassesApiResponseProcessor} from "../apis/ClassesApi";

export interface ClassesApiClassesCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof ClassesApiclassesCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesCount
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesCount
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesCount
     */
    majorId?: number
}

export interface ClassesApiClassesCreateRequest {
    /**
     * 
     * @type ClassDto
     * @memberof ClassesApiclassesCreate
     */
    classDto?: ClassDto
}

export interface ClassesApiClassesDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesDelete
     */
    id: number
}

export interface ClassesApiClassesDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesDetail
     */
    id: number
}

export interface ClassesApiClassesPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof ClassesApiclassesPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof ClassesApiclassesPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesPage
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesPage
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesPage
     */
    majorId?: number
}

export interface ClassesApiClassesRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof ClassesApiclassesRange
     */
    ids?: Array<number>
}

export interface ClassesApiClassesUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ClassesApiclassesUpdate
     */
    id: number
    /**
     * 
     * @type ClassDto
     * @memberof ClassesApiclassesUpdate
     */
    classDto?: ClassDto
}

export class ObjectClassesApi {
    private api: ObservableClassesApi

    public constructor(configuration: Configuration, requestFactory?: ClassesApiRequestFactory, responseProcessor?: ClassesApiResponseProcessor) {
        this.api = new ObservableClassesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public classesCountWithHttpInfo(param: ClassesApiClassesCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.classesCountWithHttpInfo(param.name, param.teacherId, param.departmentId, param.majorId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesCount(param: ClassesApiClassesCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.classesCount(param.name, param.teacherId, param.departmentId, param.majorId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesCreateWithHttpInfo(param: ClassesApiClassesCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.classesCreateWithHttpInfo(param.classDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesCreate(param: ClassesApiClassesCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.classesCreate(param.classDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesDeleteWithHttpInfo(param: ClassesApiClassesDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.classesDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesDelete(param: ClassesApiClassesDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.classesDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesDetailWithHttpInfo(param: ClassesApiClassesDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<ClassDto>> {
        return this.api.classesDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesDetail(param: ClassesApiClassesDetailRequest, options?: ConfigurationOptions): Promise<ClassDto> {
        return this.api.classesDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesPageWithHttpInfo(param: ClassesApiClassesPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ClassDto>>> {
        return this.api.classesPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.teacherId, param.departmentId, param.majorId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesPage(param: ClassesApiClassesPageRequest = {}, options?: ConfigurationOptions): Promise<Array<ClassDto>> {
        return this.api.classesPage(param.limit, param.offset, param.orderBy, param.name, param.teacherId, param.departmentId, param.majorId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesRangeWithHttpInfo(param: ClassesApiClassesRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ClassDto>>> {
        return this.api.classesRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesRange(param: ClassesApiClassesRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<ClassDto>> {
        return this.api.classesRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesUpdateWithHttpInfo(param: ClassesApiClassesUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.classesUpdateWithHttpInfo(param.id, param.classDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public classesUpdate(param: ClassesApiClassesUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.classesUpdate(param.id, param.classDto,  options).toPromise();
    }

}

import { ObservableConfigApi } from "./ObservableAPI";
import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";

export interface ConfigApiConfigGetConfigRequest {
}

export interface ConfigApiConfigUpdateConfigRequest {
    /**
     * 
     * @type ConfigDto
     * @memberof ConfigApiconfigUpdateConfig
     */
    configDto?: ConfigDto
}

export class ObjectConfigApi {
    private api: ObservableConfigApi

    public constructor(configuration: Configuration, requestFactory?: ConfigApiRequestFactory, responseProcessor?: ConfigApiResponseProcessor) {
        this.api = new ObservableConfigApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public configGetConfigWithHttpInfo(param: ConfigApiConfigGetConfigRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<ConfigDto>> {
        return this.api.configGetConfigWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public configGetConfig(param: ConfigApiConfigGetConfigRequest = {}, options?: ConfigurationOptions): Promise<ConfigDto> {
        return this.api.configGetConfig( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public configUpdateConfigWithHttpInfo(param: ConfigApiConfigUpdateConfigRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.configUpdateConfigWithHttpInfo(param.configDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public configUpdateConfig(param: ConfigApiConfigUpdateConfigRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.configUpdateConfig(param.configDto,  options).toPromise();
    }

}

import { ObservableCoursesApi } from "./ObservableAPI";
import { CoursesApiRequestFactory, CoursesApiResponseProcessor} from "../apis/CoursesApi";

export interface CoursesApiCoursesCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesCount
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesCount
     */
    subjectId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesCount
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CoursesApicoursesCount
     */
    subjectName?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof CoursesApicoursesCount
     */
    locked?: boolean
}

export interface CoursesApiCoursesCreateRequest {
    /**
     * 
     * @type CourseDto
     * @memberof CoursesApicoursesCreate
     */
    courseDto?: CourseDto
}

export interface CoursesApiCoursesDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesDelete
     */
    id: number
}

export interface CoursesApiCoursesDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesDetail
     */
    id: number
}

export interface CoursesApiCoursesPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof CoursesApicoursesPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesPage
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesPage
     */
    subjectId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesPage
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CoursesApicoursesPage
     */
    subjectName?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof CoursesApicoursesPage
     */
    locked?: boolean
}

export interface CoursesApiCoursesRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof CoursesApicoursesRange
     */
    ids?: Array<number>
}

export interface CoursesApiCoursesUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CoursesApicoursesUpdate
     */
    id: number
    /**
     * 
     * @type CourseDto
     * @memberof CoursesApicoursesUpdate
     */
    courseDto?: CourseDto
}

export class ObjectCoursesApi {
    private api: ObservableCoursesApi

    public constructor(configuration: Configuration, requestFactory?: CoursesApiRequestFactory, responseProcessor?: CoursesApiResponseProcessor) {
        this.api = new ObservableCoursesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public coursesCountWithHttpInfo(param: CoursesApiCoursesCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.coursesCountWithHttpInfo(param.teacherId, param.subjectId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesCount(param: CoursesApiCoursesCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.coursesCount(param.teacherId, param.subjectId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesCreateWithHttpInfo(param: CoursesApiCoursesCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.coursesCreateWithHttpInfo(param.courseDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesCreate(param: CoursesApiCoursesCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.coursesCreate(param.courseDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesDeleteWithHttpInfo(param: CoursesApiCoursesDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.coursesDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesDelete(param: CoursesApiCoursesDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.coursesDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesDetailWithHttpInfo(param: CoursesApiCoursesDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<CourseDto>> {
        return this.api.coursesDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesDetail(param: CoursesApiCoursesDetailRequest, options?: ConfigurationOptions): Promise<CourseDto> {
        return this.api.coursesDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesPageWithHttpInfo(param: CoursesApiCoursesPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<CourseDto>>> {
        return this.api.coursesPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.teacherId, param.subjectId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesPage(param: CoursesApiCoursesPageRequest = {}, options?: ConfigurationOptions): Promise<Array<CourseDto>> {
        return this.api.coursesPage(param.limit, param.offset, param.orderBy, param.teacherId, param.subjectId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesRangeWithHttpInfo(param: CoursesApiCoursesRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<CourseDto>>> {
        return this.api.coursesRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesRange(param: CoursesApiCoursesRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<CourseDto>> {
        return this.api.coursesRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesUpdateWithHttpInfo(param: CoursesApiCoursesUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.coursesUpdateWithHttpInfo(param.id, param.courseDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public coursesUpdate(param: CoursesApiCoursesUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.coursesUpdate(param.id, param.courseDto,  options).toPromise();
    }

}

import { ObservableDepartmentsApi } from "./ObservableAPI";
import { DepartmentsApiRequestFactory, DepartmentsApiResponseProcessor} from "../apis/DepartmentsApi";

export interface DepartmentsApiDepartmentsCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DepartmentsApidepartmentsCount
     */
    name?: string
}

export interface DepartmentsApiDepartmentsCreateRequest {
    /**
     * 
     * @type DepartmentDto
     * @memberof DepartmentsApidepartmentsCreate
     */
    departmentDto?: DepartmentDto
}

export interface DepartmentsApiDepartmentsDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof DepartmentsApidepartmentsDelete
     */
    id: number
}

export interface DepartmentsApiDepartmentsDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof DepartmentsApidepartmentsDetail
     */
    id: number
}

export interface DepartmentsApiDepartmentsPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof DepartmentsApidepartmentsPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof DepartmentsApidepartmentsPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof DepartmentsApidepartmentsPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DepartmentsApidepartmentsPage
     */
    name?: string
}

export interface DepartmentsApiDepartmentsRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof DepartmentsApidepartmentsRange
     */
    ids?: Array<number>
}

export interface DepartmentsApiDepartmentsUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof DepartmentsApidepartmentsUpdate
     */
    id: number
    /**
     * 
     * @type DepartmentDto
     * @memberof DepartmentsApidepartmentsUpdate
     */
    departmentDto?: DepartmentDto
}

export class ObjectDepartmentsApi {
    private api: ObservableDepartmentsApi

    public constructor(configuration: Configuration, requestFactory?: DepartmentsApiRequestFactory, responseProcessor?: DepartmentsApiResponseProcessor) {
        this.api = new ObservableDepartmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public departmentsCountWithHttpInfo(param: DepartmentsApiDepartmentsCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.departmentsCountWithHttpInfo(param.name,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsCount(param: DepartmentsApiDepartmentsCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.departmentsCount(param.name,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsCreateWithHttpInfo(param: DepartmentsApiDepartmentsCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.departmentsCreateWithHttpInfo(param.departmentDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsCreate(param: DepartmentsApiDepartmentsCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.departmentsCreate(param.departmentDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsDeleteWithHttpInfo(param: DepartmentsApiDepartmentsDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.departmentsDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsDelete(param: DepartmentsApiDepartmentsDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.departmentsDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsDetailWithHttpInfo(param: DepartmentsApiDepartmentsDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<DepartmentDto>> {
        return this.api.departmentsDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsDetail(param: DepartmentsApiDepartmentsDetailRequest, options?: ConfigurationOptions): Promise<DepartmentDto> {
        return this.api.departmentsDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsPageWithHttpInfo(param: DepartmentsApiDepartmentsPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<DepartmentDto>>> {
        return this.api.departmentsPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsPage(param: DepartmentsApiDepartmentsPageRequest = {}, options?: ConfigurationOptions): Promise<Array<DepartmentDto>> {
        return this.api.departmentsPage(param.limit, param.offset, param.orderBy, param.name,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsRangeWithHttpInfo(param: DepartmentsApiDepartmentsRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<DepartmentDto>>> {
        return this.api.departmentsRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsRange(param: DepartmentsApiDepartmentsRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<DepartmentDto>> {
        return this.api.departmentsRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsUpdateWithHttpInfo(param: DepartmentsApiDepartmentsUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.departmentsUpdateWithHttpInfo(param.id, param.departmentDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public departmentsUpdate(param: DepartmentsApiDepartmentsUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.departmentsUpdate(param.id, param.departmentDto,  options).toPromise();
    }

}

import { ObservableEnrollmentsApi } from "./ObservableAPI";
import { EnrollmentsApiRequestFactory, EnrollmentsApiResponseProcessor} from "../apis/EnrollmentsApi";

export interface EnrollmentsApiEnrollmentsCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCount
     */
    studentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCount
     */
    courseId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCount
     */
    subjectId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCount
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCount
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof EnrollmentsApienrollmentsCount
     */
    subjectName?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof EnrollmentsApienrollmentsCount
     */
    locked?: boolean
}

export interface EnrollmentsApiEnrollmentsCreateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCreate
     */
    studentId: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsCreate
     */
    courseId: number
}

export interface EnrollmentsApiEnrollmentsDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsDelete
     */
    studentId: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsDelete
     */
    courseId: number
}

export interface EnrollmentsApiEnrollmentsDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsDetail
     */
    studentId: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsDetail
     */
    courseId: number
}

export interface EnrollmentsApiEnrollmentsPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof EnrollmentsApienrollmentsPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    studentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    courseId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    subjectId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    teacherId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof EnrollmentsApienrollmentsPage
     */
    departmentId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof EnrollmentsApienrollmentsPage
     */
    subjectName?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof EnrollmentsApienrollmentsPage
     */
    locked?: boolean
}

export class ObjectEnrollmentsApi {
    private api: ObservableEnrollmentsApi

    public constructor(configuration: Configuration, requestFactory?: EnrollmentsApiRequestFactory, responseProcessor?: EnrollmentsApiResponseProcessor) {
        this.api = new ObservableEnrollmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public enrollmentsCountWithHttpInfo(param: EnrollmentsApiEnrollmentsCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.enrollmentsCountWithHttpInfo(param.studentId, param.courseId, param.subjectId, param.teacherId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsCount(param: EnrollmentsApiEnrollmentsCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.enrollmentsCount(param.studentId, param.courseId, param.subjectId, param.teacherId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsCreateWithHttpInfo(param: EnrollmentsApiEnrollmentsCreateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.enrollmentsCreateWithHttpInfo(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsCreate(param: EnrollmentsApiEnrollmentsCreateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.enrollmentsCreate(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsDeleteWithHttpInfo(param: EnrollmentsApiEnrollmentsDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.enrollmentsDeleteWithHttpInfo(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsDelete(param: EnrollmentsApiEnrollmentsDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.enrollmentsDelete(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsDetailWithHttpInfo(param: EnrollmentsApiEnrollmentsDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<EnrollmentDto>> {
        return this.api.enrollmentsDetailWithHttpInfo(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsDetail(param: EnrollmentsApiEnrollmentsDetailRequest, options?: ConfigurationOptions): Promise<EnrollmentDto> {
        return this.api.enrollmentsDetail(param.studentId, param.courseId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsPageWithHttpInfo(param: EnrollmentsApiEnrollmentsPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<EnrollmentDto>>> {
        return this.api.enrollmentsPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.studentId, param.courseId, param.subjectId, param.teacherId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public enrollmentsPage(param: EnrollmentsApiEnrollmentsPageRequest = {}, options?: ConfigurationOptions): Promise<Array<EnrollmentDto>> {
        return this.api.enrollmentsPage(param.limit, param.offset, param.orderBy, param.studentId, param.courseId, param.subjectId, param.teacherId, param.departmentId, param.subjectName, param.locked,  options).toPromise();
    }

}

import { ObservableMajorsApi } from "./ObservableAPI";
import { MajorsApiRequestFactory, MajorsApiResponseProcessor} from "../apis/MajorsApi";

export interface MajorsApiMajorsCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof MajorsApimajorsCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsCount
     */
    departmentId?: number
}

export interface MajorsApiMajorsCreateRequest {
    /**
     * 
     * @type MajorDto
     * @memberof MajorsApimajorsCreate
     */
    majorDto?: MajorDto
}

export interface MajorsApiMajorsDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsDelete
     */
    id: number
}

export interface MajorsApiMajorsDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsDetail
     */
    id: number
}

export interface MajorsApiMajorsPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof MajorsApimajorsPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof MajorsApimajorsPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsPage
     */
    departmentId?: number
}

export interface MajorsApiMajorsRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof MajorsApimajorsRange
     */
    ids?: Array<number>
}

export interface MajorsApiMajorsUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof MajorsApimajorsUpdate
     */
    id: number
    /**
     * 
     * @type MajorDto
     * @memberof MajorsApimajorsUpdate
     */
    majorDto?: MajorDto
}

export class ObjectMajorsApi {
    private api: ObservableMajorsApi

    public constructor(configuration: Configuration, requestFactory?: MajorsApiRequestFactory, responseProcessor?: MajorsApiResponseProcessor) {
        this.api = new ObservableMajorsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public majorsCountWithHttpInfo(param: MajorsApiMajorsCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.majorsCountWithHttpInfo(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsCount(param: MajorsApiMajorsCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.majorsCount(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsCreateWithHttpInfo(param: MajorsApiMajorsCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.majorsCreateWithHttpInfo(param.majorDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsCreate(param: MajorsApiMajorsCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.majorsCreate(param.majorDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsDeleteWithHttpInfo(param: MajorsApiMajorsDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.majorsDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsDelete(param: MajorsApiMajorsDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.majorsDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsDetailWithHttpInfo(param: MajorsApiMajorsDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<MajorDto>> {
        return this.api.majorsDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsDetail(param: MajorsApiMajorsDetailRequest, options?: ConfigurationOptions): Promise<MajorDto> {
        return this.api.majorsDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsPageWithHttpInfo(param: MajorsApiMajorsPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<MajorDto>>> {
        return this.api.majorsPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsPage(param: MajorsApiMajorsPageRequest = {}, options?: ConfigurationOptions): Promise<Array<MajorDto>> {
        return this.api.majorsPage(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsRangeWithHttpInfo(param: MajorsApiMajorsRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<MajorDto>>> {
        return this.api.majorsRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsRange(param: MajorsApiMajorsRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<MajorDto>> {
        return this.api.majorsRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsUpdateWithHttpInfo(param: MajorsApiMajorsUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.majorsUpdateWithHttpInfo(param.id, param.majorDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public majorsUpdate(param: MajorsApiMajorsUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.majorsUpdate(param.id, param.majorDto,  options).toPromise();
    }

}

import { ObservableProfileApi } from "./ObservableAPI";
import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";

export interface ProfileApiProfileGetRequest {
}

export interface ProfileApiProfileUpdateRequest {
    /**
     * 
     * @type UserProfile
     * @memberof ProfileApiprofileUpdate
     */
    userProfile?: UserProfile
}

export class ObjectProfileApi {
    private api: ObservableProfileApi

    public constructor(configuration: Configuration, requestFactory?: ProfileApiRequestFactory, responseProcessor?: ProfileApiResponseProcessor) {
        this.api = new ObservableProfileApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public profileGetWithHttpInfo(param: ProfileApiProfileGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<UserDto>> {
        return this.api.profileGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public profileGet(param: ProfileApiProfileGetRequest = {}, options?: ConfigurationOptions): Promise<UserDto> {
        return this.api.profileGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public profileUpdateWithHttpInfo(param: ProfileApiProfileUpdateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.profileUpdateWithHttpInfo(param.userProfile,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public profileUpdate(param: ProfileApiProfileUpdateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.profileUpdate(param.userProfile,  options).toPromise();
    }

}

import { ObservableSchedulesApi } from "./ObservableAPI";
import { SchedulesApiRequestFactory, SchedulesApiResponseProcessor} from "../apis/SchedulesApi";

export interface SchedulesApiSchedulesCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesCount
     */
    courseId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SchedulesApischedulesCount
     */
    location?: string
    /**
     * 
     * Minimum: 0
     * Maximum: 43
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesCount
     */
    week?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 6
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesCount
     */
    day?: number
}

export interface SchedulesApiSchedulesCreateRequest {
    /**
     * 
     * @type ScheduleDto
     * @memberof SchedulesApischedulesCreate
     */
    scheduleDto?: ScheduleDto
}

export interface SchedulesApiSchedulesDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SchedulesApischedulesDelete
     */
    id: string
}

export interface SchedulesApiSchedulesDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SchedulesApischedulesDetail
     */
    id: string
}

export interface SchedulesApiSchedulesPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof SchedulesApischedulesPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesPage
     */
    courseId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SchedulesApischedulesPage
     */
    location?: string
    /**
     * 
     * Minimum: 0
     * Maximum: 43
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesPage
     */
    week?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 6
     * Defaults to: undefined
     * @type number
     * @memberof SchedulesApischedulesPage
     */
    day?: number
}

export interface SchedulesApiSchedulesRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof SchedulesApischedulesRange
     */
    ids?: Array<string>
}

export interface SchedulesApiSchedulesUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SchedulesApischedulesUpdate
     */
    id: string
    /**
     * 
     * @type ScheduleDto
     * @memberof SchedulesApischedulesUpdate
     */
    scheduleDto?: ScheduleDto
}

export class ObjectSchedulesApi {
    private api: ObservableSchedulesApi

    public constructor(configuration: Configuration, requestFactory?: SchedulesApiRequestFactory, responseProcessor?: SchedulesApiResponseProcessor) {
        this.api = new ObservableSchedulesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public schedulesCountWithHttpInfo(param: SchedulesApiSchedulesCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.schedulesCountWithHttpInfo(param.courseId, param.location, param.week, param.day,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesCount(param: SchedulesApiSchedulesCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.schedulesCount(param.courseId, param.location, param.week, param.day,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesCreateWithHttpInfo(param: SchedulesApiSchedulesCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.schedulesCreateWithHttpInfo(param.scheduleDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesCreate(param: SchedulesApiSchedulesCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.schedulesCreate(param.scheduleDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesDeleteWithHttpInfo(param: SchedulesApiSchedulesDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.schedulesDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesDelete(param: SchedulesApiSchedulesDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.schedulesDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesDetailWithHttpInfo(param: SchedulesApiSchedulesDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<ScheduleDto>> {
        return this.api.schedulesDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesDetail(param: SchedulesApiSchedulesDetailRequest, options?: ConfigurationOptions): Promise<ScheduleDto> {
        return this.api.schedulesDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesPageWithHttpInfo(param: SchedulesApiSchedulesPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ScheduleDto>>> {
        return this.api.schedulesPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.courseId, param.location, param.week, param.day,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesPage(param: SchedulesApiSchedulesPageRequest = {}, options?: ConfigurationOptions): Promise<Array<ScheduleDto>> {
        return this.api.schedulesPage(param.limit, param.offset, param.orderBy, param.courseId, param.location, param.week, param.day,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesRangeWithHttpInfo(param: SchedulesApiSchedulesRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ScheduleDto>>> {
        return this.api.schedulesRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesRange(param: SchedulesApiSchedulesRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<ScheduleDto>> {
        return this.api.schedulesRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesUpdateWithHttpInfo(param: SchedulesApiSchedulesUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.schedulesUpdateWithHttpInfo(param.id, param.scheduleDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public schedulesUpdate(param: SchedulesApiSchedulesUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.schedulesUpdate(param.id, param.scheduleDto,  options).toPromise();
    }

}

import { ObservableSetupApi } from "./ObservableAPI";
import { SetupApiRequestFactory, SetupApiResponseProcessor} from "../apis/SetupApi";

export interface SetupApiSetupGenerateDemoDataRequest {
}

export interface SetupApiSetupMigrateDatabaseRequest {
}

export class ObjectSetupApi {
    private api: ObservableSetupApi

    public constructor(configuration: Configuration, requestFactory?: SetupApiRequestFactory, responseProcessor?: SetupApiResponseProcessor) {
        this.api = new ObservableSetupApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public setupGenerateDemoDataWithHttpInfo(param: SetupApiSetupGenerateDemoDataRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.setupGenerateDemoDataWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public setupGenerateDemoData(param: SetupApiSetupGenerateDemoDataRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.setupGenerateDemoData( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public setupMigrateDatabaseWithHttpInfo(param: SetupApiSetupMigrateDatabaseRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.setupMigrateDatabaseWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public setupMigrateDatabase(param: SetupApiSetupMigrateDatabaseRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.setupMigrateDatabase( options).toPromise();
    }

}

import { ObservableStudentsApi } from "./ObservableAPI";
import { StudentsApiRequestFactory, StudentsApiResponseProcessor} from "../apis/StudentsApi";

export interface StudentsApiStudentsCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof StudentsApistudentsCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsCount
     */
    classId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsCount
     */
    majorId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsCount
     */
    departmentId?: number
}

export interface StudentsApiStudentsDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsDetail
     */
    id: number
}

export interface StudentsApiStudentsPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof StudentsApistudentsPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof StudentsApistudentsPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsPage
     */
    classId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsPage
     */
    majorId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsPage
     */
    departmentId?: number
}

export interface StudentsApiStudentsRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof StudentsApistudentsRange
     */
    ids?: Array<number>
}

export interface StudentsApiStudentsUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof StudentsApistudentsUpdate
     */
    id: number
    /**
     * 
     * @type StudentDto
     * @memberof StudentsApistudentsUpdate
     */
    studentDto?: StudentDto
}

export class ObjectStudentsApi {
    private api: ObservableStudentsApi

    public constructor(configuration: Configuration, requestFactory?: StudentsApiRequestFactory, responseProcessor?: StudentsApiResponseProcessor) {
        this.api = new ObservableStudentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public studentsCountWithHttpInfo(param: StudentsApiStudentsCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.studentsCountWithHttpInfo(param.name, param.classId, param.majorId, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsCount(param: StudentsApiStudentsCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.studentsCount(param.name, param.classId, param.majorId, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsDetailWithHttpInfo(param: StudentsApiStudentsDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<StudentDto>> {
        return this.api.studentsDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsDetail(param: StudentsApiStudentsDetailRequest, options?: ConfigurationOptions): Promise<StudentDto> {
        return this.api.studentsDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsPageWithHttpInfo(param: StudentsApiStudentsPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<StudentDto>>> {
        return this.api.studentsPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.classId, param.majorId, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsPage(param: StudentsApiStudentsPageRequest = {}, options?: ConfigurationOptions): Promise<Array<StudentDto>> {
        return this.api.studentsPage(param.limit, param.offset, param.orderBy, param.name, param.classId, param.majorId, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsRangeWithHttpInfo(param: StudentsApiStudentsRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<StudentDto>>> {
        return this.api.studentsRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsRange(param: StudentsApiStudentsRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<StudentDto>> {
        return this.api.studentsRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsUpdateWithHttpInfo(param: StudentsApiStudentsUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.studentsUpdateWithHttpInfo(param.id, param.studentDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public studentsUpdate(param: StudentsApiStudentsUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.studentsUpdate(param.id, param.studentDto,  options).toPromise();
    }

}

import { ObservableSubjectsApi } from "./ObservableAPI";
import { SubjectsApiRequestFactory, SubjectsApiResponseProcessor} from "../apis/SubjectsApi";

export interface SubjectsApiSubjectsCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SubjectsApisubjectsCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsCount
     */
    departmentId?: number
}

export interface SubjectsApiSubjectsCreateRequest {
    /**
     * 
     * @type SubjectDto
     * @memberof SubjectsApisubjectsCreate
     */
    subjectDto?: SubjectDto
}

export interface SubjectsApiSubjectsDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsDelete
     */
    id: number
}

export interface SubjectsApiSubjectsDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsDetail
     */
    id: number
}

export interface SubjectsApiSubjectsPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof SubjectsApisubjectsPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof SubjectsApisubjectsPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsPage
     */
    departmentId?: number
}

export interface SubjectsApiSubjectsRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof SubjectsApisubjectsRange
     */
    ids?: Array<number>
}

export interface SubjectsApiSubjectsUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SubjectsApisubjectsUpdate
     */
    id: number
    /**
     * 
     * @type SubjectDto
     * @memberof SubjectsApisubjectsUpdate
     */
    subjectDto?: SubjectDto
}

export class ObjectSubjectsApi {
    private api: ObservableSubjectsApi

    public constructor(configuration: Configuration, requestFactory?: SubjectsApiRequestFactory, responseProcessor?: SubjectsApiResponseProcessor) {
        this.api = new ObservableSubjectsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public subjectsCountWithHttpInfo(param: SubjectsApiSubjectsCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.subjectsCountWithHttpInfo(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsCount(param: SubjectsApiSubjectsCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.subjectsCount(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsCreateWithHttpInfo(param: SubjectsApiSubjectsCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.subjectsCreateWithHttpInfo(param.subjectDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsCreate(param: SubjectsApiSubjectsCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.subjectsCreate(param.subjectDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsDeleteWithHttpInfo(param: SubjectsApiSubjectsDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.subjectsDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsDelete(param: SubjectsApiSubjectsDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.subjectsDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsDetailWithHttpInfo(param: SubjectsApiSubjectsDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<SubjectDto>> {
        return this.api.subjectsDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsDetail(param: SubjectsApiSubjectsDetailRequest, options?: ConfigurationOptions): Promise<SubjectDto> {
        return this.api.subjectsDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsPageWithHttpInfo(param: SubjectsApiSubjectsPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<SubjectDto>>> {
        return this.api.subjectsPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsPage(param: SubjectsApiSubjectsPageRequest = {}, options?: ConfigurationOptions): Promise<Array<SubjectDto>> {
        return this.api.subjectsPage(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsRangeWithHttpInfo(param: SubjectsApiSubjectsRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<SubjectDto>>> {
        return this.api.subjectsRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsRange(param: SubjectsApiSubjectsRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<SubjectDto>> {
        return this.api.subjectsRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsUpdateWithHttpInfo(param: SubjectsApiSubjectsUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.subjectsUpdateWithHttpInfo(param.id, param.subjectDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public subjectsUpdate(param: SubjectsApiSubjectsUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.subjectsUpdate(param.id, param.subjectDto,  options).toPromise();
    }

}

import { ObservableTeachersApi } from "./ObservableAPI";
import { TeachersApiRequestFactory, TeachersApiResponseProcessor} from "../apis/TeachersApi";

export interface TeachersApiTeachersCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TeachersApiteachersCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersCount
     */
    departmentId?: number
}

export interface TeachersApiTeachersDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersDetail
     */
    id: number
}

export interface TeachersApiTeachersPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof TeachersApiteachersPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TeachersApiteachersPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersPage
     */
    departmentId?: number
}

export interface TeachersApiTeachersRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof TeachersApiteachersRange
     */
    ids?: Array<number>
}

export interface TeachersApiTeachersUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof TeachersApiteachersUpdate
     */
    id: number
    /**
     * 
     * @type TeacherDto
     * @memberof TeachersApiteachersUpdate
     */
    teacherDto?: TeacherDto
}

export class ObjectTeachersApi {
    private api: ObservableTeachersApi

    public constructor(configuration: Configuration, requestFactory?: TeachersApiRequestFactory, responseProcessor?: TeachersApiResponseProcessor) {
        this.api = new ObservableTeachersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public teachersCountWithHttpInfo(param: TeachersApiTeachersCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.teachersCountWithHttpInfo(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersCount(param: TeachersApiTeachersCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.teachersCount(param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersDetailWithHttpInfo(param: TeachersApiTeachersDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<TeacherDto>> {
        return this.api.teachersDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersDetail(param: TeachersApiTeachersDetailRequest, options?: ConfigurationOptions): Promise<TeacherDto> {
        return this.api.teachersDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersPageWithHttpInfo(param: TeachersApiTeachersPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<TeacherDto>>> {
        return this.api.teachersPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersPage(param: TeachersApiTeachersPageRequest = {}, options?: ConfigurationOptions): Promise<Array<TeacherDto>> {
        return this.api.teachersPage(param.limit, param.offset, param.orderBy, param.name, param.departmentId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersRangeWithHttpInfo(param: TeachersApiTeachersRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<TeacherDto>>> {
        return this.api.teachersRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersRange(param: TeachersApiTeachersRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<TeacherDto>> {
        return this.api.teachersRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersUpdateWithHttpInfo(param: TeachersApiTeachersUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.teachersUpdateWithHttpInfo(param.id, param.teacherDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public teachersUpdate(param: TeachersApiTeachersUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.teachersUpdate(param.id, param.teacherDto,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiUsersCountRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersCount
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersCount
     */
    email?: string
    /**
     * 
     * Defaults to: undefined
     * @type UserRole
     * @memberof UsersApiusersCount
     */
    userRole?: UserRole
}

export interface UsersApiUsersCreateRequest {
    /**
     * 
     * @type UserDto
     * @memberof UsersApiusersCreate
     */
    userDto?: UserDto
}

export interface UsersApiUsersDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiusersDelete
     */
    id: number
}

export interface UsersApiUsersDetailRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiusersDetail
     */
    id: number
}

export interface UsersApiUsersPageRequest {
    /**
     * 
     * Minimum: 1
     * Maximum: 1000
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiusersPage
     */
    limit?: number
    /**
     * 
     * Minimum: 0
     * Maximum: 2147483647
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiusersPage
     */
    offset?: number
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;OrderByColumn&gt;
     * @memberof UsersApiusersPage
     */
    orderBy?: Array<OrderByColumn>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersPage
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersPage
     */
    email?: string
    /**
     * 
     * Defaults to: undefined
     * @type UserRole
     * @memberof UsersApiusersPage
     */
    userRole?: UserRole
}

export interface UsersApiUsersRangeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;number&gt;
     * @memberof UsersApiusersRange
     */
    ids?: Array<number>
}

export interface UsersApiUsersUpdateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiusersUpdate
     */
    id: number
    /**
     * 
     * @type UserDto
     * @memberof UsersApiusersUpdate
     */
    userDto?: UserDto
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public usersCountWithHttpInfo(param: UsersApiUsersCountRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<number>> {
        return this.api.usersCountWithHttpInfo(param.name, param.email, param.userRole,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersCount(param: UsersApiUsersCountRequest = {}, options?: ConfigurationOptions): Promise<number> {
        return this.api.usersCount(param.name, param.email, param.userRole,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersCreateWithHttpInfo(param: UsersApiUsersCreateRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.usersCreateWithHttpInfo(param.userDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersCreate(param: UsersApiUsersCreateRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.usersCreate(param.userDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersDeleteWithHttpInfo(param: UsersApiUsersDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.usersDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersDelete(param: UsersApiUsersDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.usersDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersDetailWithHttpInfo(param: UsersApiUsersDetailRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserDto>> {
        return this.api.usersDetailWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersDetail(param: UsersApiUsersDetailRequest, options?: ConfigurationOptions): Promise<UserDto> {
        return this.api.usersDetail(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersPageWithHttpInfo(param: UsersApiUsersPageRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        return this.api.usersPageWithHttpInfo(param.limit, param.offset, param.orderBy, param.name, param.email, param.userRole,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersPage(param: UsersApiUsersPageRequest = {}, options?: ConfigurationOptions): Promise<Array<UserDto>> {
        return this.api.usersPage(param.limit, param.offset, param.orderBy, param.name, param.email, param.userRole,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersRangeWithHttpInfo(param: UsersApiUsersRangeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        return this.api.usersRangeWithHttpInfo(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersRange(param: UsersApiUsersRangeRequest = {}, options?: ConfigurationOptions): Promise<Array<UserDto>> {
        return this.api.usersRange(param.ids,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersUpdateWithHttpInfo(param: UsersApiUsersUpdateRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.usersUpdateWithHttpInfo(param.id, param.userDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public usersUpdate(param: UsersApiUsersUpdateRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.usersUpdate(param.id, param.userDto,  options).toPromise();
    }

}
