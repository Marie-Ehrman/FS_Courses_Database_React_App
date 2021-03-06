// "Helper" class that provides utility methods
// to allow client to talk to server and retrieve data

import config from './config';

export default class Data {


    // used to make the GET and POST requests to the REST API.
    api(path, 
        method = 'GET', 
        body = null, 
        requiresAuth = false, 
        credentials = null) {
          
          const url = config.apiBaseUrl + path; // defined in config.js
    
          const options = {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

          if (body !== null) {
            options.body = JSON.stringify(body);
          }   

          if (requiresAuth) {
              // create a base-64 encoded ASCII string form the string of data 
              const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

              // holds the credentials to authenticate the client with the server
              options.headers['Authorization'] = `Basic ${encodedCredentials}`;

          }

      return fetch(url, options);
  }


  //***** USER HELPER METHODS
    
  // helper methods for creating and getting users
  async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
  }
  
  async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.error.err.errors;
          });
        }
        else {
          throw new Error();
        }
  }

  //****** COURSES HELPER METHODS

  // GET list of all course
    async getCourses() {
        const response = await this.api(`/courses`);
        if (response.status === 200) {
          return response.json().then(data => data);

        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    }

    // GET a single course
    async getCourseDetail(id) {
        const response = await this.api(`/courses/${id}`);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // POST a new a course
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.error.err.errors;
          });
        }
        else {
          throw new Error();
        }
    }

    // PUT a course update
    async updateCourse(course, emailAddress, password) {

        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
        if (response.status === 204) {
          return [];
        }
        else if (response.status === 401) {
            return null;
        } else if (response.status === 400) {
            return response.json().then(data => {
            return data.error.err.errors;
          });        
        } else {
            throw new Error();
        }

    }

    //  DELETE a course, require authentication since this is not a route to make Private
    async deleteCourse(emailAddress, password, id) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
        if (response.status === 204) {
          return [];
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
  
}