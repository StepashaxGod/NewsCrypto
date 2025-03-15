## initial workflow

- Create an html structure (index.html) for the main news Page

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

- implementing security measures(encryption, e.t.c)

- test measures

TO-DO: DONE:
Create a simple html structure for the news (header - main page to display news) √ (DONE)
Create styles for the main page that it looks tidy for the user √ (DONE)
Creating static news data as a array with necessary data like(header, publisher, date published, link) √ (DONE)
Working with API and establishing a connection via the express server √ (DONE)
Storing news in a localStorage of google chrome to avoid multiple api requests √ (DONE)
Creating a archive.js file to work with the past.html: √ (DONE)
Merging news(with each request to api server, if new news received, adding them to localstorage) √ (DONE)
Displaying past news from localStorage based ont the date √ (DONE)
Creating a login page login.html √ (DONE)
Logic for the login.html √ (DONE)
transmitting files to server, so can utilize node.js √ (DONE)
Creating register form for the user √ (DONE)
Creating a session(Cookie for the user) √ (DONE)
Create tests and utilize them √ (DONE)
trying to ensure that the software is safe √ (DONE)

