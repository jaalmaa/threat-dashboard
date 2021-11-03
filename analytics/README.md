# Analytics Service

## About

This is a service that performs analytics to identify and classify intrusion activity in the honeypots. This service will receive the interaction data and parse it against known signatures written as YARA rules.

The data transferred to and from this service will be over HTTP(S), and specific endpoints exist for different functions.

A proof of concept is created using *Python Flask* and, if performance becomes an issue this can be ported over to something more
suited to the task such as *Go*.

## Testing

Before submitting a pull request, the changes must pass the written tests. To test your code, run the following:

```
pytest tests/*
````