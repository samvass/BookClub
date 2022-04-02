Feature: View Account Library

As a BookClub user
I would like to view the library on my account
So that I can find all my liked books

Background:
    Given user with username "tester7892123", password "$Pickles1212", and email "tester7892123@gmail.com" exists in the system:

Scenario: View Account Library, user already logged in (Normal Flow)

    Given user "tester7892123" with password "$Pickles1212" is logged in
    And the user "tester7892123" has books, including book "narnia" in their library
    When the user "tester7892123" views their library 
    Then the user "tester7892123" will see their liked books

Scenario: View Account Library, user not logged in (Alternate Flow)

    Given a user is not logged in
    When the user selects the My Library tab  
    Then the user will be prompted to login and a message "user is not logged in" will appear
