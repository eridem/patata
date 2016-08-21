
# Android only
@android @ci
Feature: Awesome feature
  As a user of Patata
  I want to have a scaffolding tool
  So I can create easily features for QA

  # Background executes for each scenario
  Background:
    Given I have installed Patata CLI

  # Testing all scaffolding commands by outline examples
  Scenario Outline: Scaffolding commands
    When I am in a terminal
    And I use patata --"<clicommand>" command
    Then I should have the following result: "<result>"

    Examples:
     | cli-command | result |
     | init | create a new Patata project |
     | suite | runs a specific suite on a device |
     | create-feature | create a new feature on my filesystem |

  # See helps only tags on smoke tests
  @smoke
  Scenario: See help
    When I am in a terminal
    And I use patata command
    Then I should see the help information