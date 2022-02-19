Feature: View book recomendation

As a BookClub user
I would like to view book recommendations
So that I can add them to my library

Background:
     Given the user with username "test123", password "$Pickles1212", and email "test123@gmail.com" exists in the system:

Scenario: Logged in (Normal Flow)
    Given a user with username "test123" and password "$Pickles1212" is logged in
    When username "test123" requests to view book recommendations
    Then a list of recommended books is generated

Scenario Outline: Not logged in (Alternate Flow)
    Given a user with username "test123" is not logged in
    When username "test123" requests to view book recommendations
    Then an error message "user is not logged in" is generated