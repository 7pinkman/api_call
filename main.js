//after customHeaders function it is explained.
//check 149 line
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';//from jwt.io website we got it


// GET REQUEST
function getTodos() {
  console.log('GET Request');
  //there are couple of  ways to make get requests,we have access to axios because of CDN we included,under axios we pass object
  /*
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',//backend or api we want to hit
    params: {
      _limit : 5 //this _limit will add with url and it will only fetch 5 data
    }
  })//this returns a promise
  .then(res => showOutput(res))
  .catch(err => console.error(err));
   */
//or
/*
  axios
  .get('https://jsonplaceholder.typicode.com/todos' , {
    params: { _limit : 5}
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}
*/
//or
/*
axios
.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
.then(res => showOutput(res))
.catch(err => console.error(err))
}
*/
axios('https://jsonplaceholder.typicode.com/todos?_limit=5')//by default post has been called
.then(res => showOutput(res))
.catch(err => console.error(err))
}

// POST REQUEST(inserting)
function addTodo() {
  console.log('POST Request');
/*
  axios({
    method:'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: { //data we are sending using post request 
      title:'new todo',
      completed: false
    }
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
*/
  ////or
  axios.post('https://jsonplaceholder.typicode.com/todos',{
      title:'new todo',
      completed: false
  })
  .then(res => showOutput(res))//we can see id fiels autometically generated and it become 201 as 200 record is already present in server.
  .catch(err => console.error(err))

}

// PUT/PATCH REQUEST,put usually meant to replace entire resource,and patch kind of update the resource incrementally
function updateTodo() {
  console.log('PUT/PATCH Request');
/*
  axios.put('https://jsonplaceholder.typicode.com/todos/1',{//here we are updating only id 1
    title : 'Updated todo',
    completed : false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
*/
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{//here we are updating only id 1
    title : 'Updated todo',
    completed : false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}
//after running patch we can see that userid is still present in form but in put call userid is not present as we are overwritten or replace id 1
// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  //we can use promises for one request and when it resolve we can call another request,but here we are not looking for this.
  //below it takes an array of requests and once all the request is fulfilled,i.e.all the promises are fulfilled,then we get our response and handle it.
  
  /*axios
  .all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
  .then(res => {
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  })
  .catch(err => console.error(err))
  */
  ////or
  axios
  .all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
  .then(axios.spread((todos , posts) => showOutput(posts)))
  .catch(err => console.error(err))

}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
  //lots of time you need to send data in the headers,ex-
  //when you have authentication with like JSON we tokens,you might make a request to login,you validate your login
  //and then you get back a token and then you have to send that token in the header to access protected routes
  const config = {
    headers: {
      'Content-Type' : 'application/json',
      Authorization : 'sometoken' 
    }
  };

  axios.post('https://jsonplaceholder.typicode.com/todos',{
      title:'new todo',
      completed: false
  },
  config)
  .then(res => showOutput(res))//we can see id fiels autometically generated and it become 201 as 200 record is already present in server.
  .catch(err => console.error(err))
  
}
/*
with global we can send value with every requests,this comes in handy with authentication tokens.,in above program we showed how to add a token
to customer header by putting it in config and passing it into the request,now what if you have a whole bunch of protected routes ,you 
don't have to do this for every single one,you could do is to create a global.it is implemented in the first line in this code notebook.

*/

// not so important
// TRANSFORMING REQUESTS & RESPONSES,it just do tweak responce or request
function transformResponse() {
  console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello world'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title=data.title.toUpperCase();
      return data;
    })
  };
  
  axios(options).then(res => showOutput(res));
}


// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todoss?_limit=5')//intentionally we using wrong url,as we write todoss
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response) {
      //server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
    else if(err.request){
      //request was made but no response
      console.error(err.request);
    }
    else{
      console.error(err.message);
    }
  });
  
}

// CANCEL TOKEN,could not understand
function cancelToken() {
  console.log('Cancel Token');
  const source = axios.cancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos', {
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log('Request cancelled',thrown.message);
    }
  });
  if(true){
    source.cancel('request cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
//interceptor helps up to run some kind of functionality,i.e,we can intercept the request and run some kind of functionality like a logger.
//so we are creating a logger for any request that we make. 
axios.interceptors.request.use(config => {//here we can access anything in config,like method,url etc.
  console.log(
    `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()} `//log
  );

  return config;
},
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
//in line 222 we saw that we are basically using the global axios object
//instead of that we can create  axios instances
const axiosInstance = axios.create({
  //we can have custome setting in here ,one of them is baseURL
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments')//we dont need to add 'https://jsonplaceholder.typicode.com' because that is our base url for this instance.
              .then(res => showOutput(res));



// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
