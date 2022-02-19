 Feature: Logout
  
      As a BookClub user
      I want to log out of the application 
      So that I can use the application as a guest

   Background:
     Given the user with username "Tara321", password "$Pickles1212", and email "tara@gmail.com" exists in the system:

   Scenario: Log out with a user that is logged in (Normal Flow)
     Given the user "Tara321" with password "$Pickles1212" is logged in
     When the user "Tara321" tries to log out
     Then the user "Tara321" shall be logged out
