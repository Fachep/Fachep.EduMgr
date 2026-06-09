// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { EnrollmentDto } from '../models/EnrollmentDto';
import { OrderByColumn } from '../models/OrderByColumn';

/**
 * no description
 */
export class EnrollmentsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * @param studentId 
     * @param courseId 
     * @param subjectId 
     * @param teacherId 
     * @param departmentId 
     * @param subjectName 
     * @param locked 
     */
    public async enrollmentsCount(studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;








        // Path Params
        const localVarPath = '/api/Education/Enrollments/Count';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (studentId !== undefined) {
            requestContext.setQueryParam("StudentId", ObjectSerializer.serialize(studentId, "number", "int64"));
        }

        // Query Params
        if (courseId !== undefined) {
            requestContext.setQueryParam("CourseId", ObjectSerializer.serialize(courseId, "number", "int64"));
        }

        // Query Params
        if (subjectId !== undefined) {
            requestContext.setQueryParam("SubjectId", ObjectSerializer.serialize(subjectId, "number", "int64"));
        }

        // Query Params
        if (teacherId !== undefined) {
            requestContext.setQueryParam("TeacherId", ObjectSerializer.serialize(teacherId, "number", "int64"));
        }

        // Query Params
        if (departmentId !== undefined) {
            requestContext.setQueryParam("DepartmentId", ObjectSerializer.serialize(departmentId, "number", "int64"));
        }

        // Query Params
        if (subjectName !== undefined) {
            requestContext.setQueryParam("SubjectName", ObjectSerializer.serialize(subjectName, "string", ""));
        }

        // Query Params
        if (locked !== undefined) {
            requestContext.setQueryParam("Locked", ObjectSerializer.serialize(locked, "boolean", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["Bearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param studentId 
     * @param courseId 
     */
    public async enrollmentsCreate(studentId: number, courseId: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'studentId' is not null or undefined
        if (studentId === null || studentId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsCreate", "studentId");
        }


        // verify required parameter 'courseId' is not null or undefined
        if (courseId === null || courseId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsCreate", "courseId");
        }


        // Path Params
        const localVarPath = '/api/Education/Enrollments/{studentId}/{courseId}'
            .replace('{studentId}', encodeURIComponent(String(studentId)))
            .replace('{courseId}', encodeURIComponent(String(courseId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["Bearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param studentId 
     * @param courseId 
     */
    public async enrollmentsDelete(studentId: number, courseId: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'studentId' is not null or undefined
        if (studentId === null || studentId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsDelete", "studentId");
        }


        // verify required parameter 'courseId' is not null or undefined
        if (courseId === null || courseId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsDelete", "courseId");
        }


        // Path Params
        const localVarPath = '/api/Education/Enrollments/{studentId}/{courseId}'
            .replace('{studentId}', encodeURIComponent(String(studentId)))
            .replace('{courseId}', encodeURIComponent(String(courseId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["Bearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param studentId 
     * @param courseId 
     */
    public async enrollmentsDetail(studentId: number, courseId: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'studentId' is not null or undefined
        if (studentId === null || studentId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsDetail", "studentId");
        }


        // verify required parameter 'courseId' is not null or undefined
        if (courseId === null || courseId === undefined) {
            throw new RequiredError("EnrollmentsApi", "enrollmentsDetail", "courseId");
        }


        // Path Params
        const localVarPath = '/api/Education/Enrollments/{studentId}/{courseId}'
            .replace('{studentId}', encodeURIComponent(String(studentId)))
            .replace('{courseId}', encodeURIComponent(String(courseId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["Bearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param limit 
     * @param offset 
     * @param orderBy 
     * @param studentId 
     * @param courseId 
     * @param subjectId 
     * @param teacherId 
     * @param departmentId 
     * @param subjectName 
     * @param locked 
     */
    public async enrollmentsPage(limit?: number, offset?: number, orderBy?: Array<OrderByColumn>, studentId?: number, courseId?: number, subjectId?: number, teacherId?: number, departmentId?: number, subjectName?: string, locked?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/api/Education/Enrollments';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("Limit", ObjectSerializer.serialize(limit, "number", "int32"));
        }

        // Query Params
        if (offset !== undefined) {
            requestContext.setQueryParam("Offset", ObjectSerializer.serialize(offset, "number", "int32"));
        }

        // Query Params
        if (orderBy !== undefined) {
            const serializedParams = ObjectSerializer.serialize(orderBy, "Array<OrderByColumn>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("OrderBy", serializedParam);
            }
        }

        // Query Params
        if (studentId !== undefined) {
            requestContext.setQueryParam("StudentId", ObjectSerializer.serialize(studentId, "number", "int64"));
        }

        // Query Params
        if (courseId !== undefined) {
            requestContext.setQueryParam("CourseId", ObjectSerializer.serialize(courseId, "number", "int64"));
        }

        // Query Params
        if (subjectId !== undefined) {
            requestContext.setQueryParam("SubjectId", ObjectSerializer.serialize(subjectId, "number", "int64"));
        }

        // Query Params
        if (teacherId !== undefined) {
            requestContext.setQueryParam("TeacherId", ObjectSerializer.serialize(teacherId, "number", "int64"));
        }

        // Query Params
        if (departmentId !== undefined) {
            requestContext.setQueryParam("DepartmentId", ObjectSerializer.serialize(departmentId, "number", "int64"));
        }

        // Query Params
        if (subjectName !== undefined) {
            requestContext.setQueryParam("SubjectName", ObjectSerializer.serialize(subjectName, "string", ""));
        }

        // Query Params
        if (locked !== undefined) {
            requestContext.setQueryParam("Locked", ObjectSerializer.serialize(locked, "boolean", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["Bearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class EnrollmentsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to enrollmentsCount
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async enrollmentsCountWithHttpInfo(response: ResponseContext): Promise<HttpInfo<number >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: number = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "number", "int32"
            ) as number;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: number = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "number", "int32"
            ) as number;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to enrollmentsCreate
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async enrollmentsCreateWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to enrollmentsDelete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async enrollmentsDeleteWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to enrollmentsDetail
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async enrollmentsDetailWithHttpInfo(response: ResponseContext): Promise<HttpInfo<EnrollmentDto >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: EnrollmentDto = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "EnrollmentDto", ""
            ) as EnrollmentDto;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: EnrollmentDto = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "EnrollmentDto", ""
            ) as EnrollmentDto;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to enrollmentsPage
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async enrollmentsPageWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<EnrollmentDto> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<EnrollmentDto> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<EnrollmentDto>", ""
            ) as Array<EnrollmentDto>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<EnrollmentDto> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<EnrollmentDto>", ""
            ) as Array<EnrollmentDto>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
