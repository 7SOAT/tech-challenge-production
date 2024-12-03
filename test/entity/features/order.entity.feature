Feature: Manage Order Domain Entity

    Scenario: Create a new order instance
      Given valid parameters
      When creating a new domain order instance
      Then the order instance should be created successfully