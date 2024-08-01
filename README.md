Weather App using AccuWeather API

A simple web application that allows the user to view the current, hourly, and 5 hour forecast of selected Cities using City Name in the search bar. 

The web application uses:
Frontend: React
Backend: Node.js with Express
Styling: Bootstrap and Material-UI

#########################

Assumptions & Limitations:

The system is created with the assumptions that the:
 - The user is using a computer to access the web application
 - The user has a sufficient internet access to have little to no waiting times in fetching the selected city's weather details

System Limitations
  - The web application has a limited amount of searches because of the provided free-trial use of the AccuWeather API
  - The web application can only fetch the weather 5 hours ahead of time of the selected city.

#########################

Prerequesites:
Node.js (v14 or higher)
npm (y6 or higher)

System Setup:

1. Pull or Clone the Repository
  - git clone https://github.com/BoogieWoogie613/IntegLab2.git

2. Navigate to the project directory using the terminal and install the npm directories
  - cd integ-lab-2
  - npm install
  - npm install axios // for making API requests
  - npm install bootstrap
  - npm install @mui/material @emotion/react @emotion/styled


4. Navigate to the backend folder directory in the project to start and initialize node.js and install express
  - cd backend
  - npm init -y
  - npm install express axios cors
  - node server.js // start the backend configuration js file for node.js and axios

** The server.js will be running on http://localhost:3001

5. Navigate back to the root folder and run the web application
   - npm start

** The development server will be running on http://localhost:3000

#########################

How to acquire and change the API key when API uses are depleted in the system.

1. Register an account to https://developer.accuweather.com
2. After account creation, navigate to 'My Apps' tab and create an App with your preferred settings.
3. Your newly created app should be reflected in the tab, click and copy paste your API key.
4. Afterwards, go to the server.js file in the backend folder of the system project.
5. Replace the 'apiKey' variable whenever the free trial usage is expired and in need of renewal.
6. Delete the app and create another when that app has reached its limit uses.
7. Rinse and Repeat #3-#6.
