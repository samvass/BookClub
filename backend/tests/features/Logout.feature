Feature: Logout
  
     As a BookClub user
     I want to log out of the application 
     So that I can use the application as a guest

  Background: 
    Given the following users exist in the system:
      | username | password |
      | User1    | apple    |
      | User2    | grape    |

  Scenario: Log out with a user that is logged in (Normal Flow)
    Given the user "User1" is logged in
    When the user "User1" tries to log out
    Then the user "User1" shall be logged out
