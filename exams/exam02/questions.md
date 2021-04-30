# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
The url should clearly mention what it is returning : is it your wishlist ? is it your friends-list ?
Example : `/wishlist` represents a resource, `addItemToWishlist` does not. If we have a url `/showFriends`, it should be modified
 to `/Friends`. It should be a noun, not a verb.

## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
In the above mentioned code, the fetch doesn't return anything. It is just fetching specified path.
The code should instead be :
```
const username = function getUN(){
    return fetch('/username`)
.catch( () => {
   //check for network error
})
.then( response => {
  if(response.ok) {
    return response;
  })
.then( (username) => {
   console.log(`user is named ${username}`);
})
.catch ( (errorMsg) => {
  // handle errors
});
}
```
After getting the response as a plain text string, it should print it.

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
The DOM shows us the data in the browser(based on the logic provided in the server-side).
It can display/render the data in any way that we want.
Every-time you change/update the DOM, you need to change the code how you're getting the data from the DOM. To avoid that
 complication , you should not store the state in the DOM. The data should instead be stored in variables.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
Single-page-web application means that there is only one page load. Depending on the logic provided in the server side, it
displays the content.
Multiple-page-application means there will be multiple pages(one page leading to other pages). Eg : submitting a form, pressing a
button etc will render a new page.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
Progressive Enhancement means our code works even without client-side JS. The basic functionality of the application should work
depending on the client's capabilities.
Difference b/w a SPA that uses Progressive Enhancement & the one that doesn't :
Let take a messaging app for instance, in which you can exchange photos & videos. So, it should have the logic in layers,
like if the internet connection is slow, it should not automatically download the photos sent, messaging should still work in
that case. If this SPA doesn't use Progressive Enhancement and the user will wait forever for the pictures to be downloaded,
before he can send a message.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
Dynamic content can be seen just by tweaking the front-end. But REST provides a connection between front-end & back-end.
When we request(GET,PUT,POST) information, it uses the http or the https protocol to fetch it.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
Cookies are stored in the browser. So, sensitive information, like passwords and payment information should not be stored in a
cookie.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
Fetching the data should be separate from what we do with the data because we might want to do multiple things with the data.
Example we can fetch the userInfo & have separate function to display the usernames, and a separate function to display
their info/wishlist in different parts of the same web-page.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
Because a promise is always executed later , in other words .then() is always executed after the entire code has finished
executing. So, try/catch is useless while using promises.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
separation of concerns is both, a front-end and a server-side issue. We need to separate what we do with the data that we receive.
Example, in server-side, we need to separate the logic of validating the username, from the logic of storing their order-details.
Although users & their orders are related, it is better if the logic if storing these is separated. In front-end we need to
separate the html-changing functions  from the logic that sends data to the back-end/when we call the service. And, we can fetch
the userInfo & have separate function to display the usernames, and a separate function to display their info/wishlist in
different parts of the same web-page.
