 Feature: Login

     As a BookClub user
     I would like to login to a BookClub account
     So that I can access all funtionalities of the BookClub application

     Background:
     Given the following user with username "Andrew1", password "$Pickles1212", and email "andrew12@gmail.com" exists in the system:


     Scenario Outline: Valid Credentials (Normal Flow)

         Given a user tries to login to an account
         When a user enters a username "<username>" and password "<password>"
         Then a user will be logged into an account with username "<username>" and password "<password>"
         Examples:
         | username  | password    |
         | Andrew1   | $Pickles1212 |

    Scenario Outline: Invalid Credentials (Error Flow)

        Given a user tries to login to an account
        When a user enters a username "<username>" and password "<password>"
        Then an error message "<error_message>" will be issued
        Examples:
        | username         | password    | error_message                                           |
        | andrew$@#!^%&*() | P!ckles1212 | Username does not exist |
        |                  | P!ckles1212 | Username does not exist                               |
        | Andrew1       |             | Incorrect Password                               |