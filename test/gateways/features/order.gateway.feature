Feature: Manage orders through Order Gateway

  Scenario: Retrieve all orders from the provider
    Given the provider returns a list of orders
    When the gateway retrieves orders from the provider
    Then the returned orders should match the provider's response

  Scenario: Set order status as finished
    Given a valid order ID
    When the gateway sets the order status as finished
    Then the provider should be called to update the order status
    And the returned order should reflect the finished status