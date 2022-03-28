Feature: View Account Details

As a BookClub user
I would like to toggle to a specific page in the BookClub application
So that I can view all information regarding my account.

Background:
Given the following user with username "Andrew456", password "$Pickles1212", and email "andrew456@gmail.com" exists in the system:

Scenario Outline: View My Account, user already logged in (Normal Flow)

    Given the user with username "Andrew456" is logged in
    When the user selects the My Account page
    Then the user will be directed to the My Account page, showing username and email

Scenario Outline: View My Account, guest user (Alternate Flow)

    Given the user with username "Andrew456" is not logged in
    When the user selects the My Account page
    Then the user will be prompted to login with the message "user is not logged in"