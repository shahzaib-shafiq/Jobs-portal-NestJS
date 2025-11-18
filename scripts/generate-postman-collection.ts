import * as fs from 'fs';
import * as path from 'path';

const postmanCollection = {
  info: {
    name: 'Jobs Portal API',
    description: 'Complete API collection for Jobs Portal - NestJS application',
    schema:
      'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  },
  item: [
    {
      name: '🏠 Root',
      request: {
        method: 'GET',
        header: [],
        url: {
          raw: '{{baseUrl}}:{{port}}/',
          host: ['{{baseUrl}}'],
          path: [''],
        },
      },
      response: [
        {
          name: '200 OK',
          status: 'OK',
          code: 200,
          body: '{\n    "message": "Jobs Portal API is running",\n    "status": "ok"\n}',
        },
      ],
    },
    {
      name: '🔐 Auth',
      item: [
        {
          name: 'Register',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "firstName": "John",\n    "lastName": "Doe",\n    "email": "john.doe@example.com",\n    "password": "password123",\n    "role": "candidate",\n    "profileSummary": "Experienced developer",\n    "resumeUrl": "https://example.com/resume.pdf"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/auth/register',
              host: ['{{baseUrl}}'],
              path: ['auth', 'register'],
            },
            description: 'Register a new user',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "usr_123",\n    "firstName": "John",\n    "lastName": "Doe",\n    "email": "john.doe@example.com",\n    "role": "candidate",\n    "createdAt": "2025-02-27T10:00:00Z"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["email must be an email"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Login',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "email": "john.doe@example.com",\n    "password": "password123"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/auth/login',
              host: ['{{baseUrl}}'],
              path: ['auth', 'login'],
            },
            description: 'Login and get access token',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n    "user": {\n        "id": "usr_123",\n        "email": "john.doe@example.com",\n        "role": "candidate"\n    }\n}',
            },
            {
              name: '401 Unauthorized',
              status: 'Unauthorized',
              code: 401,
              body: '{\n    "statusCode": 401,\n    "message": "Invalid credentials",\n    "error": "Unauthorized"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '👤 User',
      item: [
        {
          name: 'Get All Users',
          request: {
            method: 'GET',
            header: [
              {
                key: 'Authorization',
                value: 'Bearer {{accessToken}}',
              },
            ],
            url: {
              raw: '{{baseUrl}}:{{port}}/user',
              host: ['{{baseUrl}}'],
              path: ['user'],
            },
            description: 'Get all users (Admin only)',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 2,\n    "users": [\n        {\n            "id": "usr_123",\n            "firstName": "John",\n            "lastName": "Doe",\n            "role": "candidate"\n        },\n        {\n            "id": "usr_456",\n            "firstName": "Sarah",\n            "lastName": "Smith",\n            "role": "employer"\n        }\n    ]\n}',
            },
            {
              name: '403 Forbidden',
              status: 'Forbidden',
              code: 403,
              body: '{\n    "statusCode": 403,\n    "message": "Access denied",\n    "error": "Forbidden"\n}',
            },
          ],
        },
        {
          name: 'Get User by ID',
          request: {
            method: 'GET',
            header: [
              {
                key: 'Authorization',
                value: 'Bearer {{accessToken}}',
              },
            ],
            url: {
              raw: '{{baseUrl}}:{{port}}/user/:id',
              host: ['{{baseUrl}}'],
              path: ['user', ':id'],
            },
            description: 'Get a single user by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "usr_123",\n    "firstName": "John",\n    "lastName": "Doe",\n    "email": "john.doe@example.com",\n    "role": "candidate"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "User not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Update User',
          request: {
            method: 'PATCH',
            header: [
              {
                key: 'Authorization',
                value: 'Bearer {{accessToken}}',
              },
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "firstName": "John",\n    "lastName": "Updated",\n    "profileSummary": "Updated profile",\n    "phone": "+1234567890"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/user/:id',
              host: ['{{baseUrl}}'],
              path: ['user', ':id'],
            },
            description: 'Update user information',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "usr_123",\n    "firstName": "John",\n    "lastName": "Updated",\n    "profileSummary": "Updated profile",\n    "phone": "+1234567890"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["phone must be a valid phone number"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Delete User',
          request: {
            method: 'DELETE',
            header: [
              {
                key: 'Authorization',
                value: 'Bearer {{accessToken}}',
              },
            ],
            url: {
              raw: '{{baseUrl}}:{{port}}/user/:id',
              host: ['{{baseUrl}}'],
              path: ['user', ':id'],
            },
            description: 'Delete a user',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "User deleted successfully"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "User not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '🏢 Company',
      item: [
        {
          name: 'Create Company',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "name": "TechCorp Solutions",\n    "description": "Leading technology solutions provider",\n    "industry": "Technology",\n    "website": "https://techcorp.com",\n    "logoUrl": "https://example.com/logo.png",\n    "createdById": "{{userId}}"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/company',
              host: ['{{baseUrl}}'],
              path: ['company'],
            },
            description: 'Create a new company',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "comp_001",\n    "name": "TechCorp Solutions",\n    "industry": "Technology",\n    "createdAt": "2025-02-27T10:00:00Z"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["name should not be empty"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Get All Companies',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/company',
              host: ['{{baseUrl}}'],
              path: ['company'],
            },
            description: 'Get all companies',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "companies": [\n        {\n            "id": "comp_001",\n            "name": "TechCorp Solutions",\n            "industry": "Technology"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Company by ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/company/:id',
              host: ['{{baseUrl}}'],
              path: ['company', ':id'],
            },
            description: 'Get a single company by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "comp_001",\n    "name": "TechCorp Solutions",\n    "industry": "Technology",\n    "website": "https://techcorp.com"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Company not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Update Company',
          request: {
            method: 'PATCH',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "name": "Updated Company Name",\n    "description": "Updated description",\n    "industry": "Updated Industry"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/company/:id',
              host: ['{{baseUrl}}'],
              path: ['company', ':id'],
            },
            description: 'Update company information',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "comp_001",\n    "name": "Updated Company Name",\n    "industry": "Updated Industry"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["industry should not be empty"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Delete Company',
          request: {
            method: 'DELETE',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/company/:id',
              host: ['{{baseUrl}}'],
              path: ['company', ':id'],
            },
            description: 'Delete a company',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "Company deleted successfully"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Company not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '💼 Job',
      item: [
        {
          name: 'Create Job',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "title": "Senior Full-Stack Developer",\n    "description": "We are looking for an experienced full-stack developer",\n    "location": "San Francisco, CA",\n    "jobType": "FULL_TIME",\n    "salary": 120000,\n    "industry": "Technology",\n    "skills": ["React", "Node.js", "TypeScript"],\n    "year": 5,\n    "budget": 150000,\n    "createdById": "{{userId}}",\n    "companyId": "{{companyId}}"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/job',
              host: ['{{baseUrl}}'],
              path: ['job'],
            },
            description: 'Create a new job posting',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "job_001",\n    "title": "Senior Full-Stack Developer",\n    "jobType": "FULL_TIME",\n    "companyId": "comp_001",\n    "createdAt": "2025-02-27T10:00:00Z"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["title should not be empty"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Get All Jobs',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/job',
              host: ['{{baseUrl}}'],
              path: ['job'],
            },
            description: 'Get all job postings',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "jobs": [\n        {\n            "id": "job_001",\n            "title": "Senior Full-Stack Developer",\n            "industry": "Technology",\n            "jobType": "FULL_TIME"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Job by ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/job/:id',
              host: ['{{baseUrl}}'],
              path: ['job', ':id'],
            },
            description: 'Get a single job by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "job_001",\n    "title": "Senior Full-Stack Developer",\n    "industry": "Technology",\n    "salary": 120000\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Job not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Update Job',
          request: {
            method: 'PATCH',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "title": "Updated Job Title",\n    "description": "Updated job description",\n    "salary": 130000\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/job/:id',
              host: ['{{baseUrl}}'],
              path: ['job', ':id'],
            },
            description: 'Update job information',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "job_001",\n    "title": "Updated Job Title",\n    "salary": 130000\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["salary must be a number"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Delete Job',
          request: {
            method: 'DELETE',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/job/:id',
              host: ['{{baseUrl}}'],
              path: ['job', ':id'],
            },
            description: 'Delete a job posting',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "Job deleted successfully"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Job not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '📄 Application',
      item: [
        {
          name: 'Create Application',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "userId": "{{userId}}",\n    "jobId": "{{jobId}}",\n    "coverLetter": "I am excited to apply for this position",\n    "resumeUrl": "https://example.com/resume.pdf",\n    "status": "PENDING"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/application',
              host: ['{{baseUrl}}'],
              path: ['application'],
            },
            description: 'Create a new job application',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "app_001",\n    "userId": "usr_123",\n    "jobId": "job_001",\n    "status": "PENDING",\n    "createdAt": "2025-02-27T10:00:00Z"\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["jobId should not be empty"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Get All Applications',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application',
              host: ['{{baseUrl}}'],
              path: ['application'],
            },
            description: 'Get all applications',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "applications": [\n        {\n            "id": "app_001",\n            "userId": "usr_123",\n            "jobId": "job_001",\n            "status": "PENDING"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Applications by User ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application?userId={{userId}}',
              host: ['{{baseUrl}}'],
              path: ['application'],
              query: [
                {
                  key: 'userId',
                  value: '{{userId}}',
                },
              ],
            },
            description: 'Get applications submitted by a specific user',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "applications": [\n        {\n            "id": "app_001",\n            "jobId": "job_001",\n            "status": "PENDING"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Applications by Job ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application?jobId={{jobId}}',
              host: ['{{baseUrl}}'],
              path: ['application'],
              query: [
                {
                  key: 'jobId',
                  value: '{{jobId}}',
                },
              ],
            },
            description: 'Get applications submitted to a specific job',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "applications": [\n        {\n            "id": "app_001",\n            "userId": "usr_123",\n            "status": "PENDING"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Check if User Applied',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application/check/:userId/:jobId',
              host: ['{{baseUrl}}'],
              path: ['application', 'check', ':userId', ':jobId'],
            },
            description: 'Check if a specific user has applied to a job',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "applied": true\n}',
            },
          ],
        },
        {
          name: 'Get Application by ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application/:id',
              host: ['{{baseUrl}}'],
              path: ['application', ':id'],
            },
            description: 'Get one application by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "app_001",\n    "userId": "usr_123",\n    "jobId": "job_001",\n    "status": "PENDING",\n    "resumeUrl": "https://example.com/resume.pdf"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Application not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Update Application',
          request: {
            method: 'PATCH',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "status": "SHORTLISTED",\n    "comments": "Strong candidate",\n    "score": 88.5\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/application/:id',
              host: ['{{baseUrl}}'],
              path: ['application', ':id'],
            },
            description: "Update an application's status or info",
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "app_001",\n    "status": "SHORTLISTED",\n    "score": 88.5\n}',
            },
            {
              name: '400 Bad Request',
              status: 'Bad Request',
              code: 400,
              body: '{\n    "statusCode": 400,\n    "message": ["status must be a valid enum value"],\n    "error": "Bad Request"\n}',
            },
          ],
        },
        {
          name: 'Delete Application',
          request: {
            method: 'DELETE',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/application/:id',
              host: ['{{baseUrl}}'],
              path: ['application', ':id'],
            },
            description: 'Delete an application',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "Application deleted successfully"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Application not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '⭐ Saved Job',
      item: [
        {
          name: 'Save Job',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "userId": "{{userId}}",\n    "jobId": "{{jobId}}"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/savejob',
              host: ['{{baseUrl}}'],
              path: ['savejob'],
            },
            description: 'Save a job for later',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "save_001",\n    "userId": "usr_123",\n    "jobId": "job_001",\n    "createdAt": "2025-02-27T10:00:00Z"\n}',
            },
          ],
        },
        {
          name: 'Get All Saved Jobs',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/savejob',
              host: ['{{baseUrl}}'],
              path: ['savejob'],
            },
            description: 'Get all saved jobs',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "saved": [\n        {\n            "id": "save_001",\n            "jobId": "job_001"\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Saved Job by ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/savejob/:id',
              host: ['{{baseUrl}}'],
              path: ['savejob', ':id'],
            },
            description: 'Get one saved job entry by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "save_001",\n    "userId": "usr_123",\n    "jobId": "job_001"\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Saved job not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Delete Saved Job',
          request: {
            method: 'DELETE',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/savejob/:id',
              host: ['{{baseUrl}}'],
              path: ['savejob', ':id'],
            },
            description: 'Remove a saved job entry',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "Saved job removed"\n}',
            },
          ],
        },
      ],
    },
    {
      name: '🔔 Notification',
      item: [
        {
          name: 'Create Notification',
          request: {
            method: 'POST',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "userId": "{{userId}}",\n    "message": "Your application was approved"\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/notification',
              host: ['{{baseUrl}}'],
              path: ['notification'],
            },
            description: 'Create a new notification',
          },
          response: [
            {
              name: '201 Created',
              status: 'Created',
              code: 201,
              body: '{\n    "id": "notif_001",\n    "message": "Your application was approved",\n    "userId": "usr_123",\n    "read": false\n}',
            },
          ],
        },
        {
          name: 'Get All Notifications',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/notification',
              host: ['{{baseUrl}}'],
              path: ['notification'],
            },
            description: 'Get all notifications',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "total": 1,\n    "notifications": [\n        {\n            "id": "notif_001",\n            "message": "Your application was approved",\n            "read": false\n        }\n    ]\n}',
            },
          ],
        },
        {
          name: 'Get Notification by ID',
          request: {
            method: 'GET',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/notification/:id',
              host: ['{{baseUrl}}'],
              path: ['notification', ':id'],
            },
            description: 'Get one notification by ID',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "notif_001",\n    "message": "Your application was approved",\n    "read": false\n}',
            },
            {
              name: '404 Not Found',
              status: 'Not Found',
              code: 404,
              body: '{\n    "statusCode": 404,\n    "message": "Notification not found",\n    "error": "Not Found"\n}',
            },
          ],
        },
        {
          name: 'Update Notification',
          request: {
            method: 'PATCH',
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            body: {
              mode: 'raw',
              raw: '{\n    "read": true\n}',
            },
            url: {
              raw: '{{baseUrl}}:{{port}}/notification/:id',
              host: ['{{baseUrl}}'],
              path: ['notification', ':id'],
            },
            description: 'Mark notification as read',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "id": "notif_001",\n    "read": true\n}',
            },
          ],
        },
        {
          name: 'Delete Notification',
          request: {
            method: 'DELETE',
            header: [],
            url: {
              raw: '{{baseUrl}}:{{port}}/notification/:id',
              host: ['{{baseUrl}}'],
              path: ['notification', ':id'],
            },
            description: 'Delete a notification',
          },
          response: [
            {
              name: '200 OK',
              status: 'OK',
              code: 200,
              body: '{\n    "message": "Notification deleted successfully"\n}',
            },
          ],
        },
      ],
    },
  ],
  variable: [
    {
      key: 'baseUrl',
      value: 'http://localhost',
      type: 'string',
    },
    {
      key: 'port',
      value: '3000',
      type: 'string',
    },
    {
      key: 'accessToken',
      value: '',
      type: 'string',
    },
    {
      key: 'userId',
      value: '',
      type: 'string',
    },
    {
      key: 'companyId',
      value: '',
      type: 'string',
    },
    {
      key: 'jobId',
      value: '',
      type: 'string',
    },
  ],
};

function generatePostmanCollection() {
  const outputPath = path.join(process.cwd(), 'postman-collection.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(postmanCollection, null, 2),
    'utf-8',
  );
  console.log('✅ Postman collection generated successfully at:', outputPath);
}

generatePostmanCollection();
