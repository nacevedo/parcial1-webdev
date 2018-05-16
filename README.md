# Description

This is a web application that uses instragram public information in order to compare the number of likes in photos of 2 users. You give the aplication two public accounts and it tells you which on has more likes in their last photos. Also, it provides statistics about a certain user: mean likes, mean comments, their follower ratio and their best picture and worst picture (based on the amount of likes they have recieved.). Finally, the record of the "fights" are stored and displayed. 

This is the url of the project: https://instragramersfight.herokuapp.com

# Creative addition
It provides statistics about a certain user: mean likes, mean comments, their follower ratio and their best picture and worst picture (based on the amount of likes they have recieved.). 👨🏻‍🎨

# Getting started

In order to run this aplication you have to follow the following steps:

npm install Go to the ./myapp/frontend folder and run cd frontend yarn install yarn build

Then go back to /myapp folder and run cd .. yarn start

You can then begin using the project! Open your browser on http://localhost:3001

Note: You need to have Nodejs, npm and yarn installed

Currently the project is running on a mLab, you have to add the following enviroment variables to run it locally. 

url: The url where mongo is listening. It should look something like this..  
**mongodb://<user<user>>:<pass<pass>>@dsxxxxx.mlab.com:xxxx/<dbname>**

mlabDatabase : The name of your mlab database. 

You have to create a collection with the name "parcial1". 







