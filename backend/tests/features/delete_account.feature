Feature: Delete Acount

As a BookClub user
I would like to delete my account 
So that my information will no longer be stored in the BookClub

Background:
Given the following user with username "Tara6", password "$Pickles1212", and email "Tara6@gmail.com" exists in the system:

Scenario: Delete the account, user logged in (Normal Flow)

Given user "Tara6", password "$Pickles1212" is logged in
When user requests to delete their account
Then account with username "Tara6" shall be deleted

