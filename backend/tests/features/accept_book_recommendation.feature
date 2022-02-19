Feature: Accept book recomendation

As a BookClub user
I would like to accept book recommendations
So that I can keep track of titles that interest me

Background:
    Given the user with username "test456", password "$Pickles1212", and email "test456@gmail.com" exists in the system:

Scenario: Logged in (Normal Flow)
    Given a user with username "test456" and password "$Pickles1212" is logged in
    When user "test456" accepts the book with title "Book1" recommendation
    Then the book "Book1" will be added to user "test456" library

Scenario: Not logged in (Alternate Flow)
    Given a user with username "test456" is not logged in
    When the user accepts the book with title "book123" recommendation
    Then an error message "user is not logged in" is generated