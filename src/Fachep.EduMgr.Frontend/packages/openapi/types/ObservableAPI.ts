import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * @param [changePasswordRequest]
     */
    public authChangePasswordWithHttpInfo(changePasswordRequest?: ChangePasswordRequest, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.authChangePassword(changePasswordRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authChangePasswordWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [changePasswordRequest]
     */
    public authChangePassword(changePasswordRequest?: ChangePasswordRequest, _options?: ConfigurationOptions): Observable<void> {
        return this.authChangePasswordWithHttpInfo(changePasswordRequest, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [userId]
     */
    public authForceResetPasswordWithHttpInfo(userId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<ResetPasswordResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.authForceResetPassword(userId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authForceResetPasswordWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [userId]
     */
    public authForceResetPassword(userId?: number, _options?: ConfigurationOptions): Observable<ResetPasswordResponse> {
        return this.authForceResetPasswordWithHttpInfo(userId, _options).pipe(map((apiResponse: HttpInfo<ResetPasswordResponse>) => apiResponse.data));
    }

    /**
     * @param [loginRequest]
     */
    public authLoginWithHttpInfo(loginRequest?: LoginRequest, _options?: ConfigurationOptions): Observable<HttpInfo<LoginResult>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.authLogin(loginRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authLoginWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [loginRequest]
     */
    public authLogin(loginRequest?: LoginRequest, _options?: ConfigurationOptions): Observable<LoginResult> {
        return this.authLoginWithHttpInfo(loginRequest, _options).pipe(map((apiResponse: HttpInfo<LoginResult>) => apiResponse.data));
    }

    /**
     * @param [deviceId]
     */
    public authLogoutWithHttpInfo(deviceId?: string, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.authLogout(deviceId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authLogoutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [deviceId]
     */
    public authLogout(deviceId?: string, _options?: ConfigurationOptions): Observable<void> {
        return this.authLogoutWithHttpInfo(deviceId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [deviceId]
     */
    public authRefreshWithHttpInfo(deviceId?: string, _options?: ConfigurationOptions): Observable<HttpInfo<LoginResult>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.authRefresh(deviceId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authRefreshWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [deviceId]
     */
    public authRefresh(deviceId?: string, _options?: ConfigurationOptions): Observable<LoginResult> {
        return this.authRefreshWithHttpInfo(deviceId, _options).pipe(map((apiResponse: HttpInfo<LoginResult>) => apiResponse.data));
    }

}

import { ClassesApiRequestFactory, ClassesApiResponseProcessor} from "../apis/ClassesApi";
export class ObservableClassesApi {
    private requestFactory: ClassesApiRequestFactory;
    private responseProcessor: ClassesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ClassesApiRequestFactory,
        responseProcessor?: ClassesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ClassesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ClassesApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesCountWithHttpInfo(name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesCount(name, teacherId, departmentId, majorId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [teacherId]
     * @param [departmentId]
     * @param [majorId]
     */
    public classesCount(name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.classesCountWithHttpInfo(name, teacherId, departmentId, majorId, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [classDto]
     */
    public classesCreateWithHttpInfo(classDto?: ClassDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesCreate(classDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [classDto]
     */
    public classesCreate(classDto?: ClassDto, _options?: ConfigurationOptions): Observable<void> {
        return this.classesCreateWithHttpInfo(classDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public classesDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public classesDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.classesDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public classesDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<ClassDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public classesDetail(id: number, _options?: ConfigurationOptions): Observable<ClassDto> {
        return this.classesDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ClassDto>) => apiResponse.data));
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
    public classesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ClassDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesPage(limit, offset, orderBy, name, teacherId, departmentId, majorId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesPageWithHttpInfo(rsp)));
            }));
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
    public classesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, teacherId?: number, departmentId?: number, majorId?: number, _options?: ConfigurationOptions): Observable<Array<ClassDto>> {
        return this.classesPageWithHttpInfo(limit, offset, orderBy, name, teacherId, departmentId, majorId, _options).pipe(map((apiResponse: HttpInfo<Array<ClassDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public classesRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ClassDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public classesRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<ClassDto>> {
        return this.classesRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<ClassDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [classDto]
     */
    public classesUpdateWithHttpInfo(id: number, classDto?: ClassDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.classesUpdate(id, classDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.classesUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [classDto]
     */
    public classesUpdate(id: number, classDto?: ClassDto, _options?: ConfigurationOptions): Observable<void> {
        return this.classesUpdateWithHttpInfo(id, classDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";
export class ObservableConfigApi {
    private requestFactory: ConfigApiRequestFactory;
    private responseProcessor: ConfigApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ConfigApiRequestFactory,
        responseProcessor?: ConfigApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ConfigApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ConfigApiResponseProcessor();
    }

    /**
     */
    public configGetConfigWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<ConfigDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.configGetConfig(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.configGetConfigWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public configGetConfig(_options?: ConfigurationOptions): Observable<ConfigDto> {
        return this.configGetConfigWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<ConfigDto>) => apiResponse.data));
    }

    /**
     * @param [configDto]
     */
    public configUpdateConfigWithHttpInfo(configDto?: ConfigDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.configUpdateConfig(configDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.configUpdateConfigWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [configDto]
     */
    public configUpdateConfig(configDto?: ConfigDto, _options?: ConfigurationOptions): Observable<void> {
        return this.configUpdateConfigWithHttpInfo(configDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { CoursesApiRequestFactory, CoursesApiResponseProcessor} from "../apis/CoursesApi";
export class ObservableCoursesApi {
    private requestFactory: CoursesApiRequestFactory;
    private responseProcessor: CoursesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CoursesApiRequestFactory,
        responseProcessor?: CoursesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CoursesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CoursesApiResponseProcessor();
    }

    /**
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesCountWithHttpInfo(teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesCount(teacherId, subjectId, departmentId, subjectName, locked, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [teacherId]
     * @param [subjectId]
     * @param [departmentId]
     * @param [subjectName]
     * @param [locked]
     */
    public coursesCount(teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<number> {
        return this.coursesCountWithHttpInfo(teacherId, subjectId, departmentId, subjectName, locked, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [courseDto]
     */
    public coursesCreateWithHttpInfo(courseDto?: CourseDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesCreate(courseDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [courseDto]
     */
    public coursesCreate(courseDto?: CourseDto, _options?: ConfigurationOptions): Observable<void> {
        return this.coursesCreateWithHttpInfo(courseDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public coursesDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public coursesDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.coursesDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public coursesDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<CourseDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public coursesDetail(id: number, _options?: ConfigurationOptions): Observable<CourseDto> {
        return this.coursesDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<CourseDto>) => apiResponse.data));
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
    public coursesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<HttpInfo<Array<CourseDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesPage(limit, offset, orderBy, teacherId, subjectId, departmentId, subjectName, locked, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesPageWithHttpInfo(rsp)));
            }));
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
    public coursesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, teacherId?: number, subjectId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<Array<CourseDto>> {
        return this.coursesPageWithHttpInfo(limit, offset, orderBy, teacherId, subjectId, departmentId, subjectName, locked, _options).pipe(map((apiResponse: HttpInfo<Array<CourseDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public coursesRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<CourseDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public coursesRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<CourseDto>> {
        return this.coursesRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<CourseDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [courseDto]
     */
    public coursesUpdateWithHttpInfo(id: number, courseDto?: CourseDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.coursesUpdate(id, courseDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.coursesUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [courseDto]
     */
    public coursesUpdate(id: number, courseDto?: CourseDto, _options?: ConfigurationOptions): Observable<void> {
        return this.coursesUpdateWithHttpInfo(id, courseDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { DepartmentsApiRequestFactory, DepartmentsApiResponseProcessor} from "../apis/DepartmentsApi";
export class ObservableDepartmentsApi {
    private requestFactory: DepartmentsApiRequestFactory;
    private responseProcessor: DepartmentsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DepartmentsApiRequestFactory,
        responseProcessor?: DepartmentsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DepartmentsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DepartmentsApiResponseProcessor();
    }

    /**
     * @param [name]
     */
    public departmentsCountWithHttpInfo(name?: string, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsCount(name, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     */
    public departmentsCount(name?: string, _options?: ConfigurationOptions): Observable<number> {
        return this.departmentsCountWithHttpInfo(name, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [departmentDto]
     */
    public departmentsCreateWithHttpInfo(departmentDto?: DepartmentDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsCreate(departmentDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [departmentDto]
     */
    public departmentsCreate(departmentDto?: DepartmentDto, _options?: ConfigurationOptions): Observable<void> {
        return this.departmentsCreateWithHttpInfo(departmentDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public departmentsDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public departmentsDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.departmentsDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public departmentsDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<DepartmentDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public departmentsDetail(id: number, _options?: ConfigurationOptions): Observable<DepartmentDto> {
        return this.departmentsDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<DepartmentDto>) => apiResponse.data));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     */
    public departmentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<DepartmentDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsPage(limit, offset, orderBy, name, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsPageWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     */
    public departmentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, _options?: ConfigurationOptions): Observable<Array<DepartmentDto>> {
        return this.departmentsPageWithHttpInfo(limit, offset, orderBy, name, _options).pipe(map((apiResponse: HttpInfo<Array<DepartmentDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public departmentsRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<DepartmentDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public departmentsRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<DepartmentDto>> {
        return this.departmentsRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<DepartmentDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [departmentDto]
     */
    public departmentsUpdateWithHttpInfo(id: number, departmentDto?: DepartmentDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.departmentsUpdate(id, departmentDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.departmentsUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [departmentDto]
     */
    public departmentsUpdate(id: number, departmentDto?: DepartmentDto, _options?: ConfigurationOptions): Observable<void> {
        return this.departmentsUpdateWithHttpInfo(id, departmentDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { EnrollmentsApiRequestFactory, EnrollmentsApiResponseProcessor} from "../apis/EnrollmentsApi";
export class ObservableEnrollmentsApi {
    private requestFactory: EnrollmentsApiRequestFactory;
    private responseProcessor: EnrollmentsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: EnrollmentsApiRequestFactory,
        responseProcessor?: EnrollmentsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new EnrollmentsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new EnrollmentsApiResponseProcessor();
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
    public enrollmentsCountWithHttpInfo(studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.enrollmentsCount(studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.enrollmentsCountWithHttpInfo(rsp)));
            }));
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
    public enrollmentsCount(studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<number> {
        return this.enrollmentsCountWithHttpInfo(studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsCreateWithHttpInfo(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.enrollmentsCreate(studentId, courseId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.enrollmentsCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsCreate(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<void> {
        return this.enrollmentsCreateWithHttpInfo(studentId, courseId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDeleteWithHttpInfo(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.enrollmentsDelete(studentId, courseId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.enrollmentsDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDelete(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<void> {
        return this.enrollmentsDeleteWithHttpInfo(studentId, courseId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDetailWithHttpInfo(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<HttpInfo<EnrollmentDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.enrollmentsDetail(studentId, courseId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.enrollmentsDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param studentId
     * @param courseId
     */
    public enrollmentsDetail(studentId: number, courseId: number, _options?: ConfigurationOptions): Observable<EnrollmentDto> {
        return this.enrollmentsDetailWithHttpInfo(studentId, courseId, _options).pipe(map((apiResponse: HttpInfo<EnrollmentDto>) => apiResponse.data));
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
    public enrollmentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<HttpInfo<Array<EnrollmentDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.enrollmentsPage(limit, offset, orderBy, studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.enrollmentsPageWithHttpInfo(rsp)));
            }));
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
    public enrollmentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: ConfigurationOptions): Observable<Array<EnrollmentDto>> {
        return this.enrollmentsPageWithHttpInfo(limit, offset, orderBy, studentId, courseId, subjectId, teacherId, departmentId, subjectName, locked, _options).pipe(map((apiResponse: HttpInfo<Array<EnrollmentDto>>) => apiResponse.data));
    }

}

import { MajorsApiRequestFactory, MajorsApiResponseProcessor} from "../apis/MajorsApi";
export class ObservableMajorsApi {
    private requestFactory: MajorsApiRequestFactory;
    private responseProcessor: MajorsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: MajorsApiRequestFactory,
        responseProcessor?: MajorsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new MajorsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new MajorsApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public majorsCountWithHttpInfo(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsCount(name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public majorsCount(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.majorsCountWithHttpInfo(name, departmentId, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [majorDto]
     */
    public majorsCreateWithHttpInfo(majorDto?: MajorDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsCreate(majorDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [majorDto]
     */
    public majorsCreate(majorDto?: MajorDto, _options?: ConfigurationOptions): Observable<void> {
        return this.majorsCreateWithHttpInfo(majorDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public majorsDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public majorsDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.majorsDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public majorsDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<MajorDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public majorsDetail(id: number, _options?: ConfigurationOptions): Observable<MajorDto> {
        return this.majorsDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<MajorDto>) => apiResponse.data));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public majorsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<MajorDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsPage(limit, offset, orderBy, name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsPageWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public majorsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<Array<MajorDto>> {
        return this.majorsPageWithHttpInfo(limit, offset, orderBy, name, departmentId, _options).pipe(map((apiResponse: HttpInfo<Array<MajorDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public majorsRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<MajorDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public majorsRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<MajorDto>> {
        return this.majorsRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<MajorDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [majorDto]
     */
    public majorsUpdateWithHttpInfo(id: number, majorDto?: MajorDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.majorsUpdate(id, majorDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.majorsUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [majorDto]
     */
    public majorsUpdate(id: number, majorDto?: MajorDto, _options?: ConfigurationOptions): Observable<void> {
        return this.majorsUpdateWithHttpInfo(id, majorDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { ProfileApiRequestFactory, ProfileApiResponseProcessor} from "../apis/ProfileApi";
export class ObservableProfileApi {
    private requestFactory: ProfileApiRequestFactory;
    private responseProcessor: ProfileApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ProfileApiRequestFactory,
        responseProcessor?: ProfileApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ProfileApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ProfileApiResponseProcessor();
    }

    /**
     */
    public profileGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<UserDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.profileGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.profileGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public profileGet(_options?: ConfigurationOptions): Observable<UserDto> {
        return this.profileGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<UserDto>) => apiResponse.data));
    }

    /**
     * @param [userProfile]
     */
    public profileUpdateWithHttpInfo(userProfile?: UserProfile, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.profileUpdate(userProfile, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.profileUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [userProfile]
     */
    public profileUpdate(userProfile?: UserProfile, _options?: ConfigurationOptions): Observable<void> {
        return this.profileUpdateWithHttpInfo(userProfile, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { SchedulesApiRequestFactory, SchedulesApiResponseProcessor} from "../apis/SchedulesApi";
export class ObservableSchedulesApi {
    private requestFactory: SchedulesApiRequestFactory;
    private responseProcessor: SchedulesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SchedulesApiRequestFactory,
        responseProcessor?: SchedulesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SchedulesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SchedulesApiResponseProcessor();
    }

    /**
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesCountWithHttpInfo(courseId?: number, location?: string, week?: number, day?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesCount(courseId, location, week, day, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [courseId]
     * @param [location]
     * @param [week]
     * @param [day]
     */
    public schedulesCount(courseId?: number, location?: string, week?: number, day?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.schedulesCountWithHttpInfo(courseId, location, week, day, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [scheduleDto]
     */
    public schedulesCreateWithHttpInfo(scheduleDto?: ScheduleDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesCreate(scheduleDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [scheduleDto]
     */
    public schedulesCreate(scheduleDto?: ScheduleDto, _options?: ConfigurationOptions): Observable<void> {
        return this.schedulesCreateWithHttpInfo(scheduleDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public schedulesDeleteWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public schedulesDelete(id: string, _options?: ConfigurationOptions): Observable<void> {
        return this.schedulesDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public schedulesDetailWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<ScheduleDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public schedulesDetail(id: string, _options?: ConfigurationOptions): Observable<ScheduleDto> {
        return this.schedulesDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ScheduleDto>) => apiResponse.data));
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
    public schedulesPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, courseId?: number, location?: string, week?: number, day?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ScheduleDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesPage(limit, offset, orderBy, courseId, location, week, day, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesPageWithHttpInfo(rsp)));
            }));
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
    public schedulesPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, courseId?: number, location?: string, week?: number, day?: number, _options?: ConfigurationOptions): Observable<Array<ScheduleDto>> {
        return this.schedulesPageWithHttpInfo(limit, offset, orderBy, courseId, location, week, day, _options).pipe(map((apiResponse: HttpInfo<Array<ScheduleDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public schedulesRangeWithHttpInfo(ids?: Array<string>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ScheduleDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public schedulesRange(ids?: Array<string>, _options?: ConfigurationOptions): Observable<Array<ScheduleDto>> {
        return this.schedulesRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<ScheduleDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [scheduleDto]
     */
    public schedulesUpdateWithHttpInfo(id: string, scheduleDto?: ScheduleDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.schedulesUpdate(id, scheduleDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.schedulesUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [scheduleDto]
     */
    public schedulesUpdate(id: string, scheduleDto?: ScheduleDto, _options?: ConfigurationOptions): Observable<void> {
        return this.schedulesUpdateWithHttpInfo(id, scheduleDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { SetupApiRequestFactory, SetupApiResponseProcessor} from "../apis/SetupApi";
export class ObservableSetupApi {
    private requestFactory: SetupApiRequestFactory;
    private responseProcessor: SetupApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SetupApiRequestFactory,
        responseProcessor?: SetupApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SetupApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SetupApiResponseProcessor();
    }

    /**
     */
    public setupGenerateDemoDataWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<string>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.setupGenerateDemoData(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.setupGenerateDemoDataWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public setupGenerateDemoData(_options?: ConfigurationOptions): Observable<string> {
        return this.setupGenerateDemoDataWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     */
    public setupMigrateDatabaseWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.setupMigrateDatabase(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.setupMigrateDatabaseWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public setupMigrateDatabase(_options?: ConfigurationOptions): Observable<void> {
        return this.setupMigrateDatabaseWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { StudentsApiRequestFactory, StudentsApiResponseProcessor} from "../apis/StudentsApi";
export class ObservableStudentsApi {
    private requestFactory: StudentsApiRequestFactory;
    private responseProcessor: StudentsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: StudentsApiRequestFactory,
        responseProcessor?: StudentsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new StudentsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new StudentsApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsCountWithHttpInfo(name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.studentsCount(name, classId, majorId, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.studentsCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [classId]
     * @param [majorId]
     * @param [departmentId]
     */
    public studentsCount(name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.studentsCountWithHttpInfo(name, classId, majorId, departmentId, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public studentsDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<StudentDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.studentsDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.studentsDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public studentsDetail(id: number, _options?: ConfigurationOptions): Observable<StudentDto> {
        return this.studentsDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<StudentDto>) => apiResponse.data));
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
    public studentsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<StudentDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.studentsPage(limit, offset, orderBy, name, classId, majorId, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.studentsPageWithHttpInfo(rsp)));
            }));
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
    public studentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, classId?: number, majorId?: number, departmentId?: number, _options?: ConfigurationOptions): Observable<Array<StudentDto>> {
        return this.studentsPageWithHttpInfo(limit, offset, orderBy, name, classId, majorId, departmentId, _options).pipe(map((apiResponse: HttpInfo<Array<StudentDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public studentsRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<StudentDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.studentsRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.studentsRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public studentsRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<StudentDto>> {
        return this.studentsRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<StudentDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [studentDto]
     */
    public studentsUpdateWithHttpInfo(id: number, studentDto?: StudentDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.studentsUpdate(id, studentDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.studentsUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [studentDto]
     */
    public studentsUpdate(id: number, studentDto?: StudentDto, _options?: ConfigurationOptions): Observable<void> {
        return this.studentsUpdateWithHttpInfo(id, studentDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { SubjectsApiRequestFactory, SubjectsApiResponseProcessor} from "../apis/SubjectsApi";
export class ObservableSubjectsApi {
    private requestFactory: SubjectsApiRequestFactory;
    private responseProcessor: SubjectsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SubjectsApiRequestFactory,
        responseProcessor?: SubjectsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SubjectsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SubjectsApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public subjectsCountWithHttpInfo(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsCount(name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public subjectsCount(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.subjectsCountWithHttpInfo(name, departmentId, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [subjectDto]
     */
    public subjectsCreateWithHttpInfo(subjectDto?: SubjectDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsCreate(subjectDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [subjectDto]
     */
    public subjectsCreate(subjectDto?: SubjectDto, _options?: ConfigurationOptions): Observable<void> {
        return this.subjectsCreateWithHttpInfo(subjectDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public subjectsDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public subjectsDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.subjectsDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public subjectsDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<SubjectDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public subjectsDetail(id: number, _options?: ConfigurationOptions): Observable<SubjectDto> {
        return this.subjectsDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<SubjectDto>) => apiResponse.data));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public subjectsPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<SubjectDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsPage(limit, offset, orderBy, name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsPageWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public subjectsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<Array<SubjectDto>> {
        return this.subjectsPageWithHttpInfo(limit, offset, orderBy, name, departmentId, _options).pipe(map((apiResponse: HttpInfo<Array<SubjectDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public subjectsRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<SubjectDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public subjectsRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<SubjectDto>> {
        return this.subjectsRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<SubjectDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [subjectDto]
     */
    public subjectsUpdateWithHttpInfo(id: number, subjectDto?: SubjectDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.subjectsUpdate(id, subjectDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.subjectsUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [subjectDto]
     */
    public subjectsUpdate(id: number, subjectDto?: SubjectDto, _options?: ConfigurationOptions): Observable<void> {
        return this.subjectsUpdateWithHttpInfo(id, subjectDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { TeachersApiRequestFactory, TeachersApiResponseProcessor} from "../apis/TeachersApi";
export class ObservableTeachersApi {
    private requestFactory: TeachersApiRequestFactory;
    private responseProcessor: TeachersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TeachersApiRequestFactory,
        responseProcessor?: TeachersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TeachersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TeachersApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public teachersCountWithHttpInfo(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.teachersCount(name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.teachersCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [departmentId]
     */
    public teachersCount(name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<number> {
        return this.teachersCountWithHttpInfo(name, departmentId, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public teachersDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<TeacherDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.teachersDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.teachersDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public teachersDetail(id: number, _options?: ConfigurationOptions): Observable<TeacherDto> {
        return this.teachersDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<TeacherDto>) => apiResponse.data));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public teachersPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<TeacherDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.teachersPage(limit, offset, orderBy, name, departmentId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.teachersPageWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [departmentId]
     */
    public teachersPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, departmentId?: number, _options?: ConfigurationOptions): Observable<Array<TeacherDto>> {
        return this.teachersPageWithHttpInfo(limit, offset, orderBy, name, departmentId, _options).pipe(map((apiResponse: HttpInfo<Array<TeacherDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public teachersRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<TeacherDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.teachersRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.teachersRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public teachersRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<TeacherDto>> {
        return this.teachersRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<TeacherDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [teacherDto]
     */
    public teachersUpdateWithHttpInfo(id: number, teacherDto?: TeacherDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.teachersUpdate(id, teacherDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.teachersUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [teacherDto]
     */
    public teachersUpdate(id: number, teacherDto?: TeacherDto, _options?: ConfigurationOptions): Observable<void> {
        return this.teachersUpdateWithHttpInfo(id, teacherDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class ObservableUsersApi {
    private requestFactory: UsersApiRequestFactory;
    private responseProcessor: UsersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UsersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UsersApiResponseProcessor();
    }

    /**
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersCountWithHttpInfo(name?: string, email?: string, userRole?: UserRole, _options?: ConfigurationOptions): Observable<HttpInfo<number>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersCount(name, email, userRole, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersCountWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersCount(name?: string, email?: string, userRole?: UserRole, _options?: ConfigurationOptions): Observable<number> {
        return this.usersCountWithHttpInfo(name, email, userRole, _options).pipe(map((apiResponse: HttpInfo<number>) => apiResponse.data));
    }

    /**
     * @param [userDto]
     */
    public usersCreateWithHttpInfo(userDto?: UserDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersCreate(userDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersCreateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [userDto]
     */
    public usersCreate(userDto?: UserDto, _options?: ConfigurationOptions): Observable<void> {
        return this.usersCreateWithHttpInfo(userDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public usersDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public usersDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.usersDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public usersDetailWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<UserDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersDetail(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersDetailWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public usersDetail(id: number, _options?: ConfigurationOptions): Observable<UserDto> {
        return this.usersDetailWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<UserDto>) => apiResponse.data));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersPageWithHttpInfo(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, email?: string, userRole?: UserRole, _options?: ConfigurationOptions): Observable<HttpInfo<Array<UserDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersPage(limit, offset, orderBy, name, email, userRole, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersPageWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [limit]
     * @param [offset]
     * @param [orderBy]
     * @param [name]
     * @param [email]
     * @param [userRole]
     */
    public usersPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, name?: string, email?: string, userRole?: UserRole, _options?: ConfigurationOptions): Observable<Array<UserDto>> {
        return this.usersPageWithHttpInfo(limit, offset, orderBy, name, email, userRole, _options).pipe(map((apiResponse: HttpInfo<Array<UserDto>>) => apiResponse.data));
    }

    /**
     * @param [ids]
     */
    public usersRangeWithHttpInfo(ids?: Array<number>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<UserDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersRange(ids, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersRangeWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [ids]
     */
    public usersRange(ids?: Array<number>, _options?: ConfigurationOptions): Observable<Array<UserDto>> {
        return this.usersRangeWithHttpInfo(ids, _options).pipe(map((apiResponse: HttpInfo<Array<UserDto>>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [userDto]
     */
    public usersUpdateWithHttpInfo(id: number, userDto?: UserDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.usersUpdate(id, userDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersUpdateWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [userDto]
     */
    public usersUpdate(id: number, userDto?: UserDto, _options?: ConfigurationOptions): Observable<void> {
        return this.usersUpdateWithHttpInfo(id, userDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}
