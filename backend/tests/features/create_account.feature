Feature: Create Account

As a BookClub user
I would like to create a BookClub account 
So that I can access all funtionalities of the BookClub application

Scenario Outline: Valid Credentials (Normal Flow)

    Given a user tries to create an account
    When a user enters a username "<username>", email "<email>", and password "<password>"
    Then a new account will be created with username "<username>", email "<email>", and password "<password>"
    
    Examples:
    | username       | email                 | password     |
    | Andrew745      | andrew745@gmail.com  | Pickles1212$ |


Scenario Outline: Invalid Credentials (Error Flow)

    Given a user tries to create an account
    When a user enters a username "<username>", email "<email>", and password "<password>"
    Then an error message "<error_messsage>" is issued
    
    Examples:
    | username          | email              | password     | error_messsage                                                                  |
    | andrew$@#!^%&*()  | andrew@domain.com  | P!ckles1212$ | Username must not contain special characters                                    |
    |                   | andrew@domain.com  | P!ckles1212$ | Username must contain more than 5 characters                                    |
    | andrew 123        | andrew@domain.com  | P!ckles1212$ | Username cannot contain spaces                                                  |
    | Andrew123         | andrewDomain       | P!ckles1212$ | Email must be valid                                                             |
    | Andrew123         | andrew@domain.com  | sir123       | Password must contain an upper case, lower case, special character, and number  |
    | Andrew123         | andrew@domain.com  |              | Password must contain more than 8 characters                                    |
    | Andrew123         | andrew@domain.com  | sir 123      | Password cannot contain spaces                                                  |