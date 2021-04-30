# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
	Static files are located in our local system. It can contain HTML, CSS, JS(NOT server side).On receiving a request for that file, the server will show the same page everytime.
	Dynamic file does not exist on our local system. On receiving a request, it sends a page depending on the logic provided in our server side.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
	Relative path is relative to the current file. Absolute path is the path from our document root. 
	Document root is the starting point(that we specify (by going to the directory & running npx serve)) in a directory. If we specify an absolute path, it can access files only in the root(it does not have access to files outside that root). However, by specifying a relative path, you can access all files relative to the current file.

## Q: What is the difference between server-side and client-side JS?
	client-side JS only relates to things that happen in the browser. It takes care of the appearence of our web-page. server-side JS relates to the back-end i.e the functionality of a page, the information that is passed from the browser to the server & it does something with that information. server-side JS can generate new pages, browser-side JS cannot do that & only applies to specific HTML pages.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
	we should not use `var` because `var` can be redeclared and the value can be replaced, hence it becomes confusing. We cannot redeclare `let` & `const`.
	`let` is used when the value of the variable can change (example, in `for` loop or the `input` word in our exam01 coding assignment)
	`const` is used when we do not want that value to be replaced by any other value. Example : `secretWord` in our exam01 coding assignment (if we are not changing it/no concept of new game is there)


## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
	
	1. By explicitly using __proto__ and specifying the prototype
	2. By specifying properties to a new object

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".

	function purr(animal, voice) {
		this.animal = animal;
		this.voice = voice;
	}

	let maru = new purr("cat", "shrill");

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".

	snake.__proto__= hiss;

## Q: Explain what a callback is, and give an example.
	It is a function that is passed to another function. The function that receives the callback can call the callback.
	It basically says, I(callback) am giving you(other function) the control, call me back when you need me.

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `used as a callback`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
	We should name CSS classes after what they are, because that way, it will be more descriptive and while reading the code and makes it easier to understand. Example : if we want to display alert messages on a page in a red box, the class `alert-messages` is much easier to understand than the class `red-box`.

