Feature: Remove Book From Library

    As a BookClub user
    I would like to remove a book from My Library
    So that I can get rid of books I am no longer interested in

    Background:
        Given user with username "tara789", password "$Pickles1212", and email "tara789@gmail.com" exists in the system:

    Scenario: Remove Book From Library, user logged in (Normal Flow)
        Given user "tara789", password "$Pickles1212" is logged in
        And the user "tara789" has books, including book "hunger games" in their library
        When user "tara789" removes the "hunger games" book
        Then user "tara789" will no longer see "hunger games" in their library



