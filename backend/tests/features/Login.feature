Feature: Login

    As a BookClub user
    I would like to login to a BookClub account
    So that I can access all funtionalities of the BookClub application

    Scenario Outline: Valid Credentials (Normal Flow)

        Given a user tries to login to an account
        When a user enters a username <username> and password <password>
        Then a user will be logged into an account with username <username> and password <password>
        | username  | password    |
        | Andrew321 | Pickles1212 |

    Scenario Outline: Invalid Credentials (Error Flow)

        Given a user tries to login to an account
        When a user enters invalid username <username> or password <password>
        Then an error message <error_messsage> is issued
        | username         | password    | error_messsage                                          |
        | andrew$@#!^%&*() | P!ckles1212 | Account with this username and password does not exist. |
        |                  | P!ckles1212 | Username cannot be empty.                               |
        | Andrew123        |             | Password cannot be empty.                               |