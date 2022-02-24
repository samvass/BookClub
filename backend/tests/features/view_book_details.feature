Feature: View Book Details

As a BookClub user
I would like to view the details of a book given the book ISBN number
So that I can decide if I want to add it to my library

Scenario: Book details available (Normal Flow)

Given the following book information is available in the BookClub system
| ISBN        | title                | author        | publisher     | published_date | overview      |
| 146424731-5 | The Son of the Sheik | Tonia Bulloch | Tonia Bulloch | 10-21-2021     | Book Overview |
When a user requests the details of the book with ISBN number "146424731-5"
Then the following book information is generated
| ISBN        | title                | author        | publisher     | published_date | overview      |
| 146424731-5 | The Son of the Sheik | Tonia Bulloch | Tonia Bulloch | 10-21-2021     | Book Overview |

Scenario: Book details unavailable (Alternate Flow)

Given the book with ISBN number "abcd" is unavailable in the BookClub system
When a user requests the details of the book with ISBN number "abcd"
Then the error message "Book not found" is generated