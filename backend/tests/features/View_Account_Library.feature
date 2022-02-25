Feature: View Account Library

As a BookClub user
I would like to view the library on my account
So that I can find all my liked books

   Background:
     Given user with username "Tara321", password "$Pickles1212", and email "tara@gmail.com" exists in the system:

Scenario Outline: View Account Library, user already logged in (Normal Flow)

Given user "Tara321" with password "$Pickles1212" is logged in
And the user "Tara321" has books, including book "narnia" in their library
When the user "Tara321" views their library 
Then the user "Tara321" will see their liked books

Scenario Outline: View Account Library, user not logged in (Alternate Flow)

Given a user is not logged in
When the user selects the My Library tab  
Then the user will be prompted to login and a message "user is not logged in" will appear
