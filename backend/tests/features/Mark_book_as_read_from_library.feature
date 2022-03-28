# Feature: Mark Book as Read from Library

# As a BookClub user
# I would like to mark a book as read in my library given the book ISBN number
# So that I can know which book from my library is read

# Background:
# Given the following user with username "Andrew456", password "$Pickles1212", and email "andrew456@gmail.com" exists in the system:

# Scenario: The book is in my library (Normal Flow)

# Given the following book information is available in the BookClub system
# | title                          | author          | publisher      | published_date |
# | Software Engineering at Google | Titus Winters   | O'Reilly Media | 2020-02-28     |
# When a user requests to mark the book with title "Software Engineering at Google" as read
# Then the book status changes to read in my library list

