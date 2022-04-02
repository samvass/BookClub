Feature: View Book Details

As a BookClub user
I would like to view the details of a book given the book ISBN number
So that I can decide if I want to add it to my library

Scenario: Book details available (Normal Flow)

Given the following book information is available in the BookClub system
| title                          | author          | publisher      | published_date |
| Software Engineering at Google | Titus Winters   | O'Reilly Media | 2020-02-28     |
When a user requests the details of the book with title "Software Engineering at Google"
Then the following book information is generated
| title                          | author          | publisher      | published_date |
| Software Engineering at Google | Titus Winters   | O'Reilly Media | 2020-02-28     |