Feature: View Account Details

As a BookClub user
I would like to toggle to a specific page in the BookClub application
So that I can view all information regarding my account.

Scenario Outline: View My Account, user already logged in (Normal Flow)

    Given the user "username" is logged in
    When the user "username" select the My Account tab
    Then the user "username" will be directed to the My Account page

Scenario Outline: View My Account, guest user (Alternate Flow)

    Given the user is not logged in
    When the user selects the My Account page
    Then the user will be prompted to login