Feature: Order Queue Management
  As a user of the Order Queue API
  I want to manage the orders in the queue
  So that I can create, list, synchronize, and finish orders.

  Scenario: Create a new order in the queue
    Given I have an order with ID "1234"
    When I send a POST request to "/orders-queue" with the order ID
    Then the order should be added to the queue
    And the response should contain a success message

  Scenario: List all orders in the queue
    Given there are orders in the queue
    When I send a GET request to "/orders-queue"
    Then the response should contain a list of orders
    And each order should have an "orderId" and "positionInQueue"

  Scenario: No orders in the queue
    Given the queue is empty
    When I send a GET request to "/orders-queue"
    Then the response should be a "404 Not Found"
    And the message should be "There are no orders in production queue"

  Scenario: Synchronize orders in the queue
    Given the queue is out of sync
    When I send a GET request to "/orders-queue/sync"
    Then the queue should be synchronized
    And the response should contain the updated list of orders

  Scenario: Finish an order in the queue
    Given there is an order with ID "a295e42e-dd2b-48f2-bec0-3725597281f3" in the queue
    When I send a PUT request to "/orders-queue/finish" with the order ID
    Then the order should be removed from the queue
    And the response should contain a void message