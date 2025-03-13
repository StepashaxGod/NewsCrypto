## initial workflow

- Create an html structure  (index.html) for the main news Page 

- Create css styles (add styles to index.html)

- Create static data to try out generating code (working with objects and trying out generating code)

- Figuring out the API platforms provide (Found CryptoPanic for the api requests(at least i get the news from them for free, but the redirection id prohibited, the don't provide the path to the original source))

- figuring out how to make the connection to their server via the node.js because cant test the CryptoPanic api because of the cors (setting up the express server)

- establishing own server through the node.js via the express frame to avoid the cors (having a different localhost that allows me to retrieve data from third parties)

- localstorage for the news(storing news and extracting them)

- working with dates, thinking how to ask the localstorage for specific news, based on the date.
- creating archive.js for generating past news and working with the past.html file, quite uncomfortable to have everything in app.js

- merging news(old news saving and getting them from localstorage), fetching news and comparing the id's (old.id new.id as key in the object to avoid duplicates) 
- working on the archive file, displaying past news(based on the date).

- creating a login.html with styles

- creating logic for the login (decided to keep it simple, store the users in a list)

- transmitting file to the server 3000

- creating a session for the user  

- implementing security measures(encryption, https)

- test measures

- deploying 

TO-DO:																																			DONE: 
Create a simple html structure for the news (header - main page to display news)											√ (DONE)
Create styles for the main page that it looks tidy for the user																√ (DONE)
Creating static news data as a array with necessary data like(header, publisher, date published, link)			√ (DONE)
Working with API and establishing a connection via the express server														√ (DONE)
Storing news in a localStorage of google chrome to avoid multiple api requests											√ (DONE)
Creating a archive.js file to work with the past.html:																			√ (DONE)
- (serves as the archive news page that asks for news from localstorage)													
Merging news(with each request to api server, if new news received, adding them to localstorage)					√ (DONE)
Displaying past news from localStorage based ont the date 																		√ (DONE)
Creating a login page login.html																											√ (DONE)
Logic for the login.html 																													√ (DONE)	
transmitting files to server, so can utilize node.js																				√ (DONE)
Creating register form for the user																										√ (DONE)
Creating a session(Cookie for the user)																								√ (DONE)
Create tests and utilize them 																											√ (in process...)
trying to ensure that the software is safe 																							√ (in process...)


## High level

Architecture
	Client (Frontend):
	   index.html serves as the main entry point.
      past.html as the past news display page.
		login.html if the want ot log in
	   A css/ folder contains style sheets.
	   A js/ folder contains client-side scripts.
	   An assets/ folder hosts images, icons, etc.
	   Responsible for rendering and displaying news items to the user.
	Server (Backend):
	   The server/ folder holds the Node.js/Express application.
      Handles interactions with external data sources like the CryptoPanic API.
	   Provides endpoints that the client calls to load news.
	Database:
	   Initially i store news in the localStorage for efficiency(for now) 
	   If the project grows, i will integrate (e.g., MongoDB, PostgreSQL).

Data Flow
	   The client sends a request to the Node.js/Express server (for example, GET /api/news) to fetch the latest cryptocurrency news.
	   The server forwards the request to the external API (e.g., CryptoPanic), receives the data, and sends it back to the client.
	The client:
	   Saves the data in localStorage for caching.
	   Displays the news on the main page.

	A separate page (e.g., past.html) or a dedicated section displays archived news, which can be retrieved from localStorage or from a database(most likely).


## Low level

File Structure:
	index.html
	   Main HTML page that includes a container (e.g., a <div> element) to display live news items.
	   References scripts in js/ and styles in css/.

   past.html
      The `past.html` page is dedicated to displaying older (archived) news items. It can retrieve them from either localStorage or a more robust data store (like a database). The user can navigate to `past.html` to view headlines from previous days. This separation of archived news helps keep the main `index.html` focused on the latest updates.

	login.html
		Login page for the user if they desire to login, simple styles (email and password)	

	css/:
	   main.css contains core styles for the main page.
	   past.css contains styles for the archived past news.
      header.css contains styles for the header
      generic-styles for general styles(body, p, e.t.c)
      reset.css has the default reset styles
	js/: 
      -- current implementation of server and data fetching.
	   app.js handles fetching data from the server (sending request to the express server => express server sends request to api server => api server answers to express server => express server answers to localhost 5500)
      
      -- generating code mostly
      DOM manipulation in app.js in clearly seen as the displayNews function, it generates code based on the news received from the CryptoPanic and working with dates (Nodes selected to work with).

      -- saving news in the localStorage
      localStorage operations are utilized for storing the data effectively and it also helps reduce the api requests.
      once the info received from api server, it is then stored in the localStorage with the timestamp, once the timestamp is out of order, the new request is sent.  
      
      works with dates 
      selects the containers with dates and manipulates them, mostly seen in the past.html on the client side, when user wants to select previous dates.

		archive.js (servers as the backend for the past.html, provides specific news, based on the date selected and filters the news based on the request).
      (functionality varies and will be divided in future).

	assets/:
	   Stores images, icons, and other static resources.

	server/:
	   server.js — the main Node.js/Express application file.
	   
	   Client-Server Interaction:
	      Fetching News:
		      The client script (e.g., app.js) calls fetch('/api/news').

	         The server route (e.g., GET /api/news) talks to the cryptoPanic api server
------------------------------------------------------------------------------------
	On the client side:
	   The data is parsed and stored in localStorage for quick access(for now).
	   The news items are rendered on the main page.
	   Displaying Archived News:
	      On the archive page (past.html) app.js loads old news items from localStorage (or requests them from the server/database) and displays them in the DOM.

	Data Storage:
	   Relying on localStorage to save and retrieve archived news items.

	CORS Handling:
      Configuring express with the cors.

	Testing, a few test will be written with jest framework in a separate file to check the connections, e.t.c.

   Security:
	   (Don't know about it yet)

	Deployment:
	   Local Environment: run npm install and npm start.
	   Production: AWS or github pages.
	   CI/CD: i have GitHub Actions.


- Development plan
   Finish the past.html, figure out the localstorage use case with the pastNews displaying(possible moving on to the database) ==> Migrate from localStorage to a full-featured DB for archiving, to have the queries for the past news, if possible.

	Add user accounts, authentication.


