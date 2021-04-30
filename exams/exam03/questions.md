# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)
    React JSX & JS functions follow mostly the same best practices. Some of the best practices are :
    1. CSS should be in a separate file & not in a style tag. This makes the code re-usable. 
       For example, if you have a chat-app and you want a specific style for where the participant displayed on the page(it is at
       multiple places) or if you want a specific style for 2 separate divs. In that situation, instead of putting the style tag 
       everywhere, you can just have a separate class and style that class in the css file. This way, the code is re-usable, the 
       readability of the code is better and it is maintainable, i.e if you want to make changes you don't have to do it in 10 different 
       places.
    2. Naming of the functions/components : functions/components should convey what they do, this improves the redability.
       Example : with a function named 'showRecipes' or a component named 'ShowRecipes', we can identify what is happening in that
       function/component. However, if it is named 'show', we will have to go through the code to understand what's happening in the 
       function / component.
    3. Every function/component should do only one thing. Eg : the function 'showRecipes' should not do other things such as 
    getRecipeList or getUserInfo. Concerns should be separated. This again improves the maintainability & readability of the code and 
    also ensures the single responsibility principle.


## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
    One major reason many places don't use SPA alone is, if you have to make an architectural change, like shift from angularJS to 
    reactJS or to any other framework, you will have to refactor the entire code/project at once. But, if your application is MPA or a 
    combination, you can release one feature/update per page at a time. This is in alignment with iterative release standards to 
    projects and also easy to measure the impact of the change. Whereas, in a SPA it is all or nothing and the cost of reversal is too 
    high as we have to drop the entire work. 
    

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.
    1. If we are calling a service that will be always be on a different domain, it will be a cross origin request, so we will get a
     CORS error if appropriate response headers are not set.
    2. React app runs on port 3000(default) and if have a proxy set to `http:/localhost:4000` , this basically routes all the service
     requests to this proxy. Example : if we make a call(from localhost port 3000) to `/service` , the request will redirect to 
     `http:/localhost:4000/service` and the response will go back to dev server running on localhost port 3000. The steps will look as 
     follows:

    a. React app runs in port 3000 of the server localhost
    b. Node server runs in port 4000 of the server localhost
    c. React app makes a fetch to `/service`
    d. Since, we have proxy set-up in package.json, the request will be re-directed to `http:/localhost:4000/service`
    e. Once the response is received by the React app, the react app will update it's components accordingly.


## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
    If all of our content is running on loaclhost port 4000, all calls will be made to `http:/localhost:4000` . We need not mention
     proxy in package.json.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
    React is uni-directional in nature i.e. the data can transfer between parent component to child component, but not vice versa.
    The following code is from one of my assignments. We create a state object and pass that to the child component.
    Example : In the snippet provided, 'userState' maintains the login status, customizing status etc. This data is passed down to the
     child components such as Home and Customize.

```
    function App() {

      const[userState, setUserState] = useState({ isLoggedIn: false, isPending: false, isCustomizing:false });

        //other functions

      if(userState.isLoggedIn){
        content = <Home userinfo={userState} onLogout={logout} onCustomize={customize}/>
        if(userState.isCustomizing){
          content = <Customize userinfo={userState} onBack={back}/>
        }
      } else{
        content = <Login onLogin={login}/>
      }

      return (
        <div className="app">
          {content}
        </div>
      );
    }

    export default App;
```
  

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.
    
    We create a data member that can manipulate the state. We pass this data member, setter as a prop/call-back to the child component.
    The child can call the call back when an event is triggered(button press/ input field change).
    Example snippet : (from one of my assignments)
    We have a state manipulator 'setPlayerGuess' in App.jsx, we pass it to the child component as a prop, and change the state in the 
    child component when an event is triggered.

    Snippet from App.jsx
    ```
    function App() {
      const [playerGuess, setPlayerGuess] = useState();
      console.log("Player guess is " + playerGuess);

      const reset = () => {
      setPlayerGuess();
      };

      return (
        <div className="game">
          <h3>Welcome to the Guess Game !</h3>
          { playerGuess && <Result playerGuess={playerGuess}/> }
          { !playerGuess && <Play setPlayerGuess={setPlayerGuess}/> }
          { playerGuess && <PlayAgain onReset={reset}/> }
        </div>
      );
    }

    export default App;
    ```

    Snippet from Play.jsx
    ```
    function Play({setPlayerGuess}) {
      const [input, setValue] = useState("");
      const handleInput = (event) => {
      setValue(event.target.value);
      }
      const updateName = (event) => {
      event.preventDefault();
      setPlayerGuess(input);
      setValue("");
    }
      return (
        <div>
          <input name="playerGuess" value={input} onChange={handleInput}/>
          <button onClick={updateName}>Check</button>
        </div>
      );
    };
    export default Play;
    ```



## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

    const students = {
      "654321" : {
        "id" : "654321",
        "name" : "Bao",
        "address" : "123 Main Street"
      },
      "789064" : {
        "id" : "789064",
        "name" : "Amit",
        "address" : "456 Western Street"
      },
      "456780" : {
        "id" : "456780",
        "name" : "Maru",
        "address" : "78 Alaskan Wy"
      }
    }

    const pizzaSteps = [
      {
        "qty" : "1",
        "ingredient" : "pizza base",
        "instructions" : "heat the base"
      },
      {
        "qty" : "1 cup",
        "ingredient" : "shredded cheese",
        "instructions" : "sprinkle over pizza"
      },
      {
        "qty" : "2 cups",
        "ingredient" : "veggies",
        "instructions" : "put on pizza"
      }
      
    ]

    I used Object for students because here, i need a key - value pair to uniquely identify the students with their id.
    I used Array of objects for pizzaSteps because we don't require a key-value pair. We can use the index to track the step number (
      assuming that the steps are in order)

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

    Let's say 'fish' is a prototype of 'aquaticAnimal' and 'aquaticAnimal' is a prototype of 'animal'.
    The basic properties of 'animal' like 'breathe' and 'reproduce' will apply to to it's prototypes i.e all  'aquaticAnimal' will have
    those properties, & it can have additional properties like 'swim'. So, 'fish' will inherit 'breathe' & 'reproduce' from 'animal' ,
    also 'swim' from 'aquaticAnimal'.

    Every JS object inherits all the properties and methods from a prototype. For instance, consider the following case:

      function Cat(breed, color) {
        this.breed = breed;
        this.color = color;
      }

      const pearl = new Cat("Persian", "Golden", "2");
      pearl.age = 2;
      console.log("Age of pearl is " + pearl.age);


      In the above example, we created a Cat object called 'pearl' and later we tried to add a new proeprty 'age'. This will not work
      and the above code will print 'undefined'. It is because, we can't add a new property to an existing object constructor.
      Instead, what we can do is 

      pearl.prototype.age = 2;
      console.log("Age of pearl is " + pearl.age);

      The above code will print 2 instead of 'undefined'. The prototype property in JS helps the user to add a new property to the 
      existing object constructor.

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.
    The part `username == underfined` is wrong here, because if the username is undefined, it will be falsy(null or empty values) and it 
    will be covered in the case `!username` . Double equals is used for comaprison between 2 variable names or a variable & a value. If
    the variable on the left hand side is undefined, it will be falsy.
    Corrected code : `if( !username){ //do something }`

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
    Decoupling means that each component does only one thing or each component has only one responsibility.
    For example, in the follwing workflow :
    App.jsx -> services.js -> server.js

    1. Here App.jsx is my react component 
    2. service.js is my JS component which fetches information from the server 
    3. server.js is the Node component/server.

    We have the react component call functions in the services.js and it in turn calls the fetch calls to api's (which is in server.js) 
    , the logic is decoupled. 

    This is beneficial in 2 ways :
    1. if you want to shift to a different framework, say AngularJS , you only have to change the react part of your app & services (
      service.js and server.js) will remain unchanged.
    2. it avoids repetition of the code, if two functions in the front end(.jsx react components) want to use the same service, we need 
    not repeat code and both functions can use the same service call inside services.js.

## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.
    In react, it is not a good practice to query the DOM directly; instead we use the state to define what we want to see on the page.
    In this case, on the button press, we will call a event handler to change the state of the object. And depending on the state of the
    object, we will render the page/ set the background color of the object.
    For example, we can have something like

    `const [buttonPressed, setButtonPressed] = useState(false);` 

    when state changes, we can toggle the class, and we can have a different background color for the classes.

## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding


  #1
    We will use console.log to debug in this case. The order of console logs will be as follows :
    1. We will check the passed value that we get from the input field.(if it is not correct, problem in the react code)
    2. check if the response is OK , or it is catching an error.
    3. if the response is ok, we will add one console.log statement in the service call & check if we are getting the correct response,
     if not, we will JSON.stringify it
    4. if we don't get the correct response after JSON.stringify, that means there is some issue on the server side & we will check our 
    get/post method.
    (If there is a problem in the react code, we will check the browser console & if there is an error in the server side, we will check 
      the terminal console)

  #2
    The other way of debugging is, using the remote debugger in the 'Source' tab inside the browser(Google Chrome). It will show us the 
    files rendered in the front-end. We can add break points & check the call stack to see the returned values. Depending upon the 
    returned value, we can understand whether the problem is at the front end or server side.

## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
```
import { useState } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  if (!count) {

    setCount(1);
  }
  return (
    <div>{count}</div>
  );
}
```
    
    The above mentioned code will render only once. The output will be 1.
    This was rendered beause count is falsy.

## Q14: What happens with the below code when rendered and why?
```
import { useState, useEffect } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  
  useEffect( () => { 
    Promise.resolve().then( () => { 
      setCount(count + 1);
    });
  }, [count]);
  return (
    <div>{count}</div>
  );
}
```
  
  This code runs infinite number of times, because count is passed as an input and whenever the count changes, it renders again. This 
  goes on infinitely, because the state is changed in every call.
  Even if we do not pass anything, it will render infinitely because of teh side-effect rendering i.e after every render, the callback 
  will be executed.
  We need to pass an empty array as a second argument if we want to render it only once. 


## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)
    Even if we do response.json() in the server-side, we have to parse it again in the front end. 
    A response object, apart from containing its JSON part, holds other information like headers and state.(It is not just the response 
      we send from the back-end)
    When we do response.json(..) in the server side, we separate out the json part of our response. Therefeore, we have to parse it 
    again in the front end.


## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)

  When our services run on different servers, it is necessary to enable CORS. Without enabling CORS, we will get a network-error. The following are the top 2 things to consider when making calls to a different domain

    1. If our services are on a different server, we would need to enable CORS. We should add appropriate response headers.
    2. We will have to include the domain name in the fetch.
    3. If we cannot have the server send CORS headers, we will have a proxy server(this doesn't run in the browser, therefore cors does 
    not apply)



## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)
    For this question, I'm assuming the following:

    1. There is no CORS enabled
    2. There is no Proxy server set-up to call the backend

    If this assumption is right, then we will get a network-error due to CORS. The fetch will fail, with an error 'ERR_FAILED'.

    Sample input: fetch('https://www.google.com');
    Sample output: VM233:1 GET https://www.google.com/ net::ERR_FAILED
             (anonymous) @ VM233:1
             new-tab-page/:1 Uncaught (in promise) TypeError: Failed to fetch

## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

```
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```

    The user will see 'Hello World', if he navigates to the given path. 
    When we go to http://localhost:3000/page/start, a GET request is made & we are redirected to http://localhost:3000/page/end. 
    Again a GET request is made & we get 'Hello World' as a response.

## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?

    By design, http should be stateless. So, we should store the state in the client-side, but if we do that, it is a security issue.
    For example, if we have a cookie that says if the user is logged in or not, it can be easily manipulated and we definitely not want
     this.
    Therefore, a hybrid approach is used and a sessionID is stored in the cookie(browser side) & all the information related to that 
    sessionID(user information & activity) is stored on the server side. This enables the user to use web as if it is stateful as well 
    as maintain the statelessness of the HTTP server.

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?
    We have learnt that, we will be spending more time skimming through code & not writing code. Therefore, apart from a working code, 
    we need a skimmable code. A code that our co-workers can understand , this can be achieved by following the best practices outlined 
    in the class. Eg : proper naming of the components, variables & services, proper indentation & separation of concerns. This improves
    the readability , maintainability & re-usability of the code.  Our code must also be optimized and we should consider scalability & 
    performance in mind. 



