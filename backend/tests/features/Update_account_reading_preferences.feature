# Feature: Update Account Reading Preferences

# As a BookClub user
# I would like to update my account reading preferences
# So that I can be suggested books that are more tailored to me

# Background:
#     Given the user with username "test45623443", password "$Pickles1212", and email "test45623443@gmail.com" exists in the system
#     And the user is on the update preferences page

# Scenario: Update preferences (Normal Flow)
#     Given a user selects at least one reading prefernece
#     When the user updates the account reading preferences
#     Then the user will have their preferences updated

# Scenario: No preferences selected (Error Flow)
#     Given no preferences are selected
#     When the user updates the account reading preferences
#     Then an error message "must select at least 1 reading preference" is generated