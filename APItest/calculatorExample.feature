Feature: example test for calculating loan monthly payment amount, endpoint is /calculate, http method is POST

  Background:
    * url serverUrl
    * def bodyOfRequest = read('classpath:APItest/calculateBody.json')
    * def requestId = java.util.UUID.randomUUID().toString()

//This test checks with different monthly and amount values to see if the monthly payment is calculated correctly. It is ran as many times as there are Examples rows
  Scenario Outline: values calculation and result is 200
    Given path '/calculate'
    * header Authorization = "bigBank_employee"
    * header X-Request-ID = requestId
    * request bodyOfRequest
    * set bodyOfRequest.loanAmount = <loanAmount>
    * set bodyOfRequest.loanDuration = <loanDuration>
    When method POST
    Then status 200
    * match header Content-Type == 'application/hal+json;charset=UTF-8'
    * match header X-Request-ID == requestId
    * match response.monthlyPayment == <expectedMonthlyPayment>
    Examples:
         |loanAmount|loanDuration|expectedMonthlyPayment|
         |5000      |60          |€124.41               |
         |500       |60          |€16.04                |
         |5000      |6           |€879.39               |
         |30000     |60          |€726.51               |
         |5000      |120         |€85.67                |
         |8417      |17          |€560.81               |

//This test checks with different amount values to see if error message is show when values are not acceptable for proper calculation
  Scenario Outline: unacceptable loanAmount value and result is 400
    Given path '/calculate'
    * header Authorization = "bigBank_employee"
    * header X-Request-ID = requestId
    * request bodyOfRequest
    * set bodyOfRequest.loanAmount = <loanAmount>
    When method POST
    Then status 400
    * match header Content-Type == 'application/hal+json;charset=UTF-8'
    * match header X-Request-ID == requestId
    * match response.error == <errorResponse>
    Examples:
        |loanAmount|errorResponse                                           |
        |499       |'Loan amount can't be lower that minimum allowed value' |
        |30001     |'Loan amount can't be higher that maximum allowed value'|
        |asd       |'Loan amount accepts only numerical values'             |

//This test checks with different duration values to see if error message is show when values are not acceptable for proper calculation
  Scenario Outline: unacceptable loanDuration value and result is 400
    Given path '/calculate'
    * header Authorization = "bigBank_employee"
    * header X-Request-ID = requestId
    * request bodyOfRequest
    * set bodyOfRequest.loanDuration = <loanDuration>
    When method POST
    Then status 400
    * match header Content-Type == 'application/hal+json;charset=UTF-8'
    * match header X-Request-ID == requestId
    * match response.error == <errorResponse>
    Examples:
        |loanDuration|errorResponse                                            |
        |5           |'Loan duration can't be lower that minimum allowed value'|
        |121         |'Loan duration can't higher that maximum allowed value'  |
        |asd         |'Loan duration accepts only numerical values'            |