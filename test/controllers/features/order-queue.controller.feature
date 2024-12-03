Feature: Manage the order queue through the controller

  Scenario: Create a new order in the queue
    Given a valid order ID
    When the controller is called to create an order in the queue
    Then the order should be added using the use case    

  Scenario: Retrieve all orders in the queue
    Given orders exist in the queue
    When the controller is called to retrieve orders
    Then all orders should be returned in JSON format

  Scenario: Synchronize orders with the provider
    Given orders exist in the provider but not in the queue
    When the controller is called to synchronize orders
    Then new orders should be added to the queue    

  Scenario: Finish an order in the queue
    Given a valid order ID
    When the controller is called to finish the order
    Then the order status should be updated to finished in the provider
    And the order should be removed from the queue