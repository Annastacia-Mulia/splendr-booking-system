#  SPLENDR: A Beauty Service Booking Application 

This is a salon appointment booking application with an administrator website. Current methods of booking appointments leave a lot of room for inefficiencies and errors such as double booking. The main purpose of Splendr is to allow clients book appointments for beauty services in salons and barbershops, and thereafter rate the services they received. This prevents double booking and forgetting appointments on both the client and beautician's side.The ratings section assists in managing customer feedback so as to improve their services.

## **Setup/Installation Instructions for SPLENDR Booking System**

### External Frameworks and Packages Used:
[Expo](https://expo.dev/) 

[Node.js](https://node.js.org/en)

[React.js](https://react.dev)

[React Native](https://reactnative.dev)
### Installation Steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/strathmore-uni/splendr-booking-system.git
   ```
   Clone the repository into a local folder on your device.

2. **Install Dependencies:**
   - Open a terminal or command prompt.
   - Using the (`cd`) command, navigate to the project directory.
   - Install the dependencies above using the command:
     ```
     npm install <dependency_name>
     ```
     For example:
     ```
     npm install mysql2
     ```

3. **Expo Setup:**
   - Create an account on [Expo](https://expo.dev/) and install Expo Go on your mobile phone (available on Android and iOS).
  
4. **Backend setup**
   - To run the server, install XAMPP Control Panel and start MySQL and run the Admin panel to launch phpmyadmin in a web browser and create a database.

    

## **Usage Instructions:**

1.  **Run the Website:**
   - To run the frontend in the browser, use:
     ```
     npm start
     ```
   - To connect to the database, run:
     ```
     node server.js
     ```
   - Ensure all dependencies are installed and configured correctly for the website to function properly.

2.  **Run the Mobile Application:**
   - Execute the command:
     ```
     npm expo start
     ```

---
### Usage Examples

Booking an appointment:

* Open the mobile app and login.
* On the homescreen select the type of service you want.
* Select the business to visit.
* Select the specific service you want from the list.
* Browse through the list of beauticians and select the one you'd like.
* Input your appointment date and time.
* Book an appointment.

Managing Users (Admin Panel):

* Open the admin panel in your browser.
* Use the sidebar to navigate to the "Users" tab.
* Perform CRUD operations on user data.

### Input/Output

* Input: User details, Appointment details, User profiles.
* Output: Appointment bookings, Beautician ratings, User management data

