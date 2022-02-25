Feature: View Book Details

As a BookClub user
I would like to view the details of a book given the book ISBN number
So that I can decide if I want to add it to my library

Scenario: Book details available (Normal Flow)

Given the book "narnia" is available
When a user requests the details of the book
Then the book "narnia" information is generated

Scenario: Book details unavailable (Alternate Flow)

Given the book "~?$!" is not available
When a user requests the details of the book
Then the error message "Error" is generated for book "~?$!"