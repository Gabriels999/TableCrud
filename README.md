# TableCrud

## This is a react table crud app developed by me, Gabriel Santos.

This project is a CRUD table with a front-end made on react, hosted on firebase and deployed on vercel.
Here's the link to the project deployed: https://table-crud-h6pluqrz3-gabriels999.vercel.app/

I've created the project using create-react-app. For the structure of the table I used some tailwind designs to implement on the project. Also used tailwind to do some visual refinement, but did only the basics since the object of the table was to show an operating CRUD.

For start I've decided to divide the table in three general parts:

* The insert row,
* The read only rows,
* The editable rows,

With that being said, my ideia was to set the insert row fixed at the bottom of the page, this way the user is always allowed to insert a new client just by filling in the input fields and submiting at the "Inserir" button.
The other two parts was to performe a react trick, render two diferent things on the screen, but at diferent times. This way the user would be able to create, read, update and delete all in two clicks away.
For receiving the data from the user and send this data to the database I used the react hook useState which allowed me to stablish the data traffic in a more direct way and let the application a little smaller in lines.
Each part has the buttons and fuction that are associate with the actions, but the most challenging was the update (or edit, as call along the code), it took me three functions to make the whole process complete. For that reason the edit section is bigger than the others.

* Show the current data on the table to the user,
* Receive the updated data,
* Send this to the database and show at the scren.

As the project was design to be used in Brazil, I choose to use the variables in portuguese, which may cause some weirdness. May not have been the best call, but it was my call.

I did all the front-end work without looking at the backend part. Since the CRUD functionalities and a good ux was my focus I've spend much more time doing front-end than the back.

To front-end <-> back-end communication was used some methods and functions from the Firebase, what has made my life so much easier to finnaly stablish a fully integrated and working table.

Before the deploy I had to handle with a problem at my code, my initial useEffect had a syntax error that ended up executing a loop which had me to pass the 50.000 free reading use of the firebase database. With that being said, my job was to understand this behaviour, solve it, and then create a new database. 

I've decided to deploy the project at Vercel since it's a platform that I'm more used to and find easier to deploy.

I had an amazing time making this project, hope you guys like it.
