import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [changePasswordRequest]
     */
    public authChangePasswordWithHttpInfo(changePasswordRequest?: ChangePasswordRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authChangePasswordWithHttpInfo(changePasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [changePasswordRequest]
     */
    public authChangePassword(changePasswordRequest?: ChangePasswordRequest, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authChangePassword(changePasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userId]
     */
    public authForceResetPasswordWithHttpInfo(userId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ResetPasswordResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authForceResetPasswordWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userId]
     */
    public authForceResetPassword(userId?: number, _options?: PromiseConfigurationOptions): Promise<ResetPasswordResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authForceResetPassword(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [loginRequest]
     */
    public authLoginWithHttpInfo(loginRequest?: LoginRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<LoginResult>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authLoginWithHttpInfo(loginRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [loginRequest]
     */
    public authLogin(loginRequest?: LoginRequest, _options?: PromiseConfigurationOptions): Promise<LoginResult> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authLogin(loginRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [deviceId]
     */
    public authLogoutWithHttpInfo(deviceId?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authLogoutWithHttpInfo(deviceId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [deviceId]
     */
    public authLogout(deviceId?: string, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authLogout(deviceId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [deviceId]
     */
    public authRefreshWithHttpInfo(deviceId?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<LoginResult>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authRefreshWithHttpInfo(deviceId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [deviceId]
     */
    public authRefresh(deviceId?: string, _options?: PromiseConfigurationOptions): Promise<LoginResult> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.authRefresh(deviceId, observableOptions);
        return result.toPromise();
    }


}



import { ObservableClassesApi } from './ObservableAPI';

import { ClassesApiRequestFactory, ClassesApiResponseProcessor} from "../apis/ClassesApi";
export class PromiseClassesApi {
    private api: ObservableClassesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ClassesApiRequestFactory,
        responseProcessor?: ClassesApiResponseProcessor
    ) {
        this.api = new ObservableClassesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesCountWithHttpInfo(name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesCountWithHttpInfo(name, teacherId, departmentId, majorId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesCount(name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesCount(name, teacherId, departmentId, majorId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [classDto]
     */
    public classesCreateWithHttpInfo(classDto?: ClassDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesCreateWithHttpInfo(classDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [classDto]
     */
    public classesCreate(classDto?: ClassDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesCreate(classDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public classesDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public classesDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public classesDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ClassDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public classesDetail(id: number, _options?: PromiseConfigurationOptions): Promise<ClassDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ClassDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesPageWithHttpInfo(limit, offset, orderBy, name, teacherId, departmentId, majorId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: PromiseConfigurationOptions): Promise<Array<ClassDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesPage(limit, offset, orderBy, name, teacherId, departmentId, majorId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public classesRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ClassDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public classesRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<ClassDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [classDto]
     */
    public classesUpdateWithHttpInfo(id: number, classDto?: ClassDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesUpdateWithHttpInfo(id, classDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [classDto]
     */
    public classesUpdate(id: number, classDto?: ClassDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.classesUpdate(id, classDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableConfigApi } from './ObservableAPI';

import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";
export class PromiseConfigApi {
    private api: ObservableConfigApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ConfigApiRequestFactory,
        responseProcessor?: ConfigApiResponseProcessor
    ) {
        this.api = new ObservableConfigApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public configGetConfigWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<ConfigDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.configGetConfigWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public configGetConfig(_options?: PromiseConfigurationOptions): Promise<ConfigDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.configGetConfig(observableOptions);
        return result.toPromise();
    }

    /**
     * @param [configDto]
     */
    public configUpdateConfigWithHttpInfo(configDto?: ConfigDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.configUpdateConfigWithHttpInfo(configDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [configDto]
     */
    public configUpdateConfig(configDto?: ConfigDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.configUpdateConfig(configDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableCoursesApi } from './ObservableAPI';

import { CoursesApiRequestFactory, CoursesApiResponseProcessor} from "../apis/CoursesApi";
export class PromiseCoursesApi {
    private api: ObservableCoursesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CoursesApiRequestFactory,
        responseProcessor?: CoursesApiResponseProcessor
    ) {
        this.api = new ObservableCoursesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesCountWithHttpInfo(teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesCountWithHttpInfo(teacherId, subjectId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesCount(teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesCount(teacherId, subjectId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [courseDto]
     */
    public coursesCreateWithHttpInfo(courseDto?: CourseDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesCreateWithHttpInfo(courseDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [courseDto]
     */
    public coursesCreate(courseDto?: CourseDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesCreate(courseDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public coursesDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public coursesDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public coursesDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<CourseDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public coursesDetail(id: number, _options?: PromiseConfigurationOptions): Promise<CourseDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<CourseDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesPageWithHttpInfo(limit, offset, orderBy, teacherId, subjectId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<Array<CourseDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesPage(limit, offset, orderBy, teacherId, subjectId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public coursesRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<CourseDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public coursesRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<CourseDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [courseDto]
     */
    public coursesUpdateWithHttpInfo(id: number, courseDto?: CourseDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesUpdateWithHttpInfo(id, courseDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [courseDto]
     */
    public coursesUpdate(id: number, courseDto?: CourseDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.coursesUpdate(id, courseDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableDepartmentsApi } from './ObservableAPI';

import { DepartmentsApiRequestFactory, DepartmentsApiResponseProcessor} from "../apis/DepartmentsApi";
export class PromiseDepartmentsApi {
    private api: ObservableDepartmentsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DepartmentsApiRequestFactory,
        responseProcessor?: DepartmentsApiResponseProcessor
    ) {
        this.api = new ObservableDepartmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     */
    public departmentsCountWithHttpInfo(name?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsCountWithHttpInfo(name, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     */
    public departmentsCount(name?: string, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsCount(name, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [departmentDto]
     */
    public departmentsCreateWithHttpInfo(departmentDto?: DepartmentDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsCreateWithHttpInfo(departmentDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [departmentDto]
     */
    public departmentsCreate(departmentDto?: DepartmentDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsCreate(departmentDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public departmentsDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public departmentsDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public departmentsDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DepartmentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public departmentsDetail(id: number, _options?: PromiseConfigurationOptions): Promise<DepartmentDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     */
    public departmentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<DepartmentDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsPageWithHttpInfo(limit, offset, orderBy, name, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     */
    public departmentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, _options?: PromiseConfigurationOptions): Promise<Array<DepartmentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsPage(limit, offset, orderBy, name, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public departmentsRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<DepartmentDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public departmentsRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<DepartmentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [departmentDto]
     */
    public departmentsUpdateWithHttpInfo(id: number, departmentDto?: DepartmentDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsUpdateWithHttpInfo(id, departmentDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [departmentDto]
     */
    public departmentsUpdate(id: number, departmentDto?: DepartmentDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.departmentsUpdate(id, departmentDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableEnrollmentsApi } from './ObservableAPI';

import { EnrollmentsApiRequestFactory, EnrollmentsApiResponseProcessor} from "../apis/EnrollmentsApi";
export class PromiseEnrollmentsApi {
    private api: ObservableEnrollmentsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: EnrollmentsApiRequestFactory,
        responseProcessor?: EnrollmentsApiResponseProcessor
    ) {
        this.api = new ObservableEnrollmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [studentId]
     * @param [courseId]
     * @param [subjectId]
     * @param [teacherId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public enrollmentsCountWithHttpInfo(studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsCountWithHttpInfo(studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [studentId]
     * @param [courseId]
     * @param [subjectId]
     * @param [teacherId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public enrollmentsCount(studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsCount(studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsCreateWithHttpInfo(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsCreateWithHttpInfo(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsCreate(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsCreate(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDeleteWithHttpInfo(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsDeleteWithHttpInfo(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDelete(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsDelete(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDetailWithHttpInfo(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<EnrollmentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsDetailWithHttpInfo(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDetail(studentId: number, courseId: number, _options?: PromiseConfigurationOptions): Promise<EnrollmentDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsDetail(studentId, courseId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [studentId]
     * @param [courseId]
     * @param [subjectId]
     * @param [teacherId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public enrollmentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<EnrollmentDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsPageWithHttpInfo(limit, offset, orderBy, studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [studentId]
     * @param [courseId]
     * @param [subjectId]
     * @param [teacherId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public enrollmentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: PromiseConfigurationOptions): Promise<Array<EnrollmentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.enrollmentsPage(limit, offset, orderBy, studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, observableOptions);
        return result.toPromise();
    }


}



import { ObservableMajorsApi } from './ObservableAPI';

import { MajorsApiRequestFactory, MajorsApiResponseProcessor} from "../apis/MajorsApi";
export class PromiseMajorsApi {
    private api: ObservableMajorsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MajorsApiRequestFactory,
        responseProcessor?: MajorsApiResponseProcessor
    ) {
        this.api = new ObservableMajorsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public majorsCountWithHttpInfo(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsCountWithHttpInfo(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public majorsCount(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsCount(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [majorDto]
     */
    public majorsCreateWithHttpInfo(majorDto?: MajorDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsCreateWithHttpInfo(majorDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [majorDto]
     */
    public majorsCreate(majorDto?: MajorDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsCreate(majorDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public majorsDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public majorsDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public majorsDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<MajorDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public majorsDetail(id: number, _options?: PromiseConfigurationOptions): Promise<MajorDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public majorsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<MajorDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsPageWithHttpInfo(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public majorsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<Array<MajorDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsPage(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public majorsRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<MajorDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public majorsRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<MajorDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [majorDto]
     */
    public majorsUpdateWithHttpInfo(id: number, majorDto?: MajorDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsUpdateWithHttpInfo(id, majorDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [majorDto]
     */
    public majorsUpdate(id: number, majorDto?: MajorDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.majorsUpdate(id, majorDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableProfileApi } from './ObservableAPI';

import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";
export class PromiseProfileApi {
    private api: ObservableProfileApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProfileApiRequestFactory,
        responseProcessor?: ProfileApiResponseProcessor
    ) {
        this.api = new ObservableProfileApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public profileGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.profileGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public profileGet(_options?: PromiseConfigurationOptions): Promise<UserDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.profileGet(observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userProfile]
     */
    public profileUpdateWithHttpInfo(userProfile?: UserProfile, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.profileUpdateWithHttpInfo(userProfile, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userProfile]
     */
    public profileUpdate(userProfile?: UserProfile, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.profileUpdate(userProfile, observableOptions);
        return result.toPromise();
    }


}



import { ObservableSchedulesApi } from './ObservableAPI';

import { SchedulesApiRequestFactory, SchedulesApiResponseProcessor} from "../apis/SchedulesApi";
export class PromiseSchedulesApi {
    private api: ObservableSchedulesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SchedulesApiRequestFactory,
        responseProcessor?: SchedulesApiResponseProcessor
    ) {
        this.api = new ObservableSchedulesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesCountWithHttpInfo(courseId?: number, location?: string, week?: number, day?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesCountWithHttpInfo(courseId, location, week, day, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesCount(courseId?: number, location?: string, week?: number, day?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesCount(courseId, location, week, day, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [scheduleDto]
     */
    public schedulesCreateWithHttpInfo(scheduleDto?: ScheduleDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesCreateWithHttpInfo(scheduleDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [scheduleDto]
     */
    public schedulesCreate(scheduleDto?: ScheduleDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesCreate(scheduleDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public schedulesDeleteWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public schedulesDelete(id: string, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public schedulesDetailWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ScheduleDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public schedulesDetail(id: string, _options?: PromiseConfigurationOptions): Promise<ScheduleDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, courseId?: number, location?: string, week?: number, day?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ScheduleDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesPageWithHttpInfo(limit, offset, orderBy, courseId, location, week, day, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, courseId?: number, location?: string, week?: number, day?: number, _options?: PromiseConfigurationOptions): Promise<Array<ScheduleDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesPage(limit, offset, orderBy, courseId, location, week, day, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public schedulesRangeWithHttpInfo(ids?: Array<string>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ScheduleDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public schedulesRange(ids?: Array<string>, _options?: PromiseConfigurationOptions): Promise<Array<ScheduleDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [scheduleDto]
     */
    public schedulesUpdateWithHttpInfo(id: string, scheduleDto?: ScheduleDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesUpdateWithHttpInfo(id, scheduleDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [scheduleDto]
     */
    public schedulesUpdate(id: string, scheduleDto?: ScheduleDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.schedulesUpdate(id, scheduleDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableSetupApi } from './ObservableAPI';

import { SetupApiRequestFactory, SetupApiResponseProcessor} from "../apis/SetupApi";
export class PromiseSetupApi {
    private api: ObservableSetupApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SetupApiRequestFactory,
        responseProcessor?: SetupApiResponseProcessor
    ) {
        this.api = new ObservableSetupApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public setupGenerateDemoDataWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.setupGenerateDemoDataWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public setupGenerateDemoData(_options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.setupGenerateDemoData(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public setupMigrateDatabaseWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.setupMigrateDatabaseWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public setupMigrateDatabase(_options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.setupMigrateDatabase(observableOptions);
        return result.toPromise();
    }


}



import { ObservableStudentsApi } from './ObservableAPI';

import { StudentsApiRequestFactory, StudentsApiResponseProcessor} from "../apis/StudentsApi";
export class PromiseStudentsApi {
    private api: ObservableStudentsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: StudentsApiRequestFactory,
        responseProcessor?: StudentsApiResponseProcessor
    ) {
        this.api = new ObservableStudentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsCountWithHttpInfo(name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsCountWithHttpInfo(name, classId, majorId, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsCount(name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsCount(name, classId, majorId, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public studentsDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<StudentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public studentsDetail(id: number, _options?: PromiseConfigurationOptions): Promise<StudentDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<StudentDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsPageWithHttpInfo(limit, offset, orderBy, name, classId, majorId, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<Array<StudentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsPage(limit, offset, orderBy, name, classId, majorId, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public studentsRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<StudentDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public studentsRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<StudentDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [studentDto]
     */
    public studentsUpdateWithHttpInfo(id: number, studentDto?: StudentDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsUpdateWithHttpInfo(id, studentDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [studentDto]
     */
    public studentsUpdate(id: number, studentDto?: StudentDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.studentsUpdate(id, studentDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableSubjectsApi } from './ObservableAPI';

import { SubjectsApiRequestFactory, SubjectsApiResponseProcessor} from "../apis/SubjectsApi";
export class PromiseSubjectsApi {
    private api: ObservableSubjectsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SubjectsApiRequestFactory,
        responseProcessor?: SubjectsApiResponseProcessor
    ) {
        this.api = new ObservableSubjectsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public subjectsCountWithHttpInfo(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsCountWithHttpInfo(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public subjectsCount(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsCount(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [subjectDto]
     */
    public subjectsCreateWithHttpInfo(subjectDto?: SubjectDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsCreateWithHttpInfo(subjectDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [subjectDto]
     */
    public subjectsCreate(subjectDto?: SubjectDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsCreate(subjectDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public subjectsDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public subjectsDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public subjectsDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SubjectDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public subjectsDetail(id: number, _options?: PromiseConfigurationOptions): Promise<SubjectDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public subjectsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<SubjectDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsPageWithHttpInfo(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public subjectsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<Array<SubjectDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsPage(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public subjectsRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<SubjectDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public subjectsRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<SubjectDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [subjectDto]
     */
    public subjectsUpdateWithHttpInfo(id: number, subjectDto?: SubjectDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsUpdateWithHttpInfo(id, subjectDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [subjectDto]
     */
    public subjectsUpdate(id: number, subjectDto?: SubjectDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.subjectsUpdate(id, subjectDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableTeachersApi } from './ObservableAPI';

import { TeachersApiRequestFactory, TeachersApiResponseProcessor} from "../apis/TeachersApi";
export class PromiseTeachersApi {
    private api: ObservableTeachersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TeachersApiRequestFactory,
        responseProcessor?: TeachersApiResponseProcessor
    ) {
        this.api = new ObservableTeachersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public teachersCountWithHttpInfo(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersCountWithHttpInfo(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public teachersCount(name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersCount(name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public teachersDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<TeacherDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public teachersDetail(id: number, _options?: PromiseConfigurationOptions): Promise<TeacherDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public teachersPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<TeacherDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersPageWithHttpInfo(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public teachersPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: PromiseConfigurationOptions): Promise<Array<TeacherDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersPage(limit, offset, orderBy, name, departmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public teachersRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<TeacherDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public teachersRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<TeacherDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [teacherDto]
     */
    public teachersUpdateWithHttpInfo(id: number, teacherDto?: TeacherDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersUpdateWithHttpInfo(id, teacherDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [teacherDto]
     */
    public teachersUpdate(id: number, teacherDto?: TeacherDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.teachersUpdate(id, teacherDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersCountWithHttpInfo(name?: string, email?: string, userRole?: UserRole, _options?: PromiseConfigurationOptions): Promise<HttpInfo<number>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersCountWithHttpInfo(name, email, userRole, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersCount(name?: string, email?: string, userRole?: UserRole, _options?: PromiseConfigurationOptions): Promise<number> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersCount(name, email, userRole, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userDto]
     */
    public usersCreateWithHttpInfo(userDto?: UserDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersCreateWithHttpInfo(userDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [userDto]
     */
    public usersCreate(userDto?: UserDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersCreate(userDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public usersDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public usersDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public usersDetailWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersDetailWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public usersDetail(id: number, _options?: PromiseConfigurationOptions): Promise<UserDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersDetail(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, email?: string, userRole?: UserRole, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersPageWithHttpInfo(limit, offset, orderBy, name, email, userRole, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, email?: string, userRole?: UserRole, _options?: PromiseConfigurationOptions): Promise<Array<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersPage(limit, offset, orderBy, name, email, userRole, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public usersRangeWithHttpInfo(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersRangeWithHttpInfo(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [ids]
     */
    public usersRange(ids?: Array<number>, _options?: PromiseConfigurationOptions): Promise<Array<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersRange(ids, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [userDto]
     */
    public usersUpdateWithHttpInfo(id: number, userDto?: UserDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersUpdateWithHttpInfo(id, userDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [userDto]
     */
    public usersUpdate(id: number, userDto?: UserDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.usersUpdate(id, userDto, observableOptions);
        return result.toPromise();
    }


}



