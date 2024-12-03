Feature: Manage Order Queue Item Domain Entity

    Scenario: Create a new order queue item instance
      Given valid parameters
      When creating a new domain order queue item instance
      Then the order queue item instance should be created successfully
      And the order queue item should be able to be updated