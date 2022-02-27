Feature: Reject book recomendation

As a BookClub user
I would like to reject book recommendations
So that I can be shown other books that may interest me

Background:
    Given the user with username "andreww12", password "$Pickles1212", and email "andreww12@gmail.com" exists in the system:

Scenario: Reject the recommendation logged in (Normal Flow)
    Given a user with username "andreww12" and password "$Pickles1212" is logged in
    When user "andreww12" rejects the book with title "Book1" recommendation
    Then the book "Book1" will not be added to user "andreww12" library


# Scenario: Reject the recommendation not logged in (Alternate Flow)
#     Given a user with username "andreww12" is not logged in
#     When user "andreww12" rejects the book with title "Book1" recommendation
#     Then a new book recommendation will be showed to the user 