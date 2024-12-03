Feature: Order Queue Gateway

  Scenario: Create a new order in the queue
    Given a valid order ID "935aa5da-6fde-40ea-9143-450704a2806d"
    When the gateway is used to create the order in the queue
    Then the order should be added successfully
    And it should return the order with the correct ID and position in the queue

  Scenario: Retrieve all orders in the queue
    Given there are multiple orders in the queue
    When the gateway is used to retrieve all orders
    Then it should return a list of all orders in the queue

  Scenario: Delete an order from the queue
    Given an order with ID "9291e14a-ffa0-4c03-8eea-a879b3bad4fd" exists in the queue
    When the gateway is used to delete the order from the queue
    Then the order should be removed successfully