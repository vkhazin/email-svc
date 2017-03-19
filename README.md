# Overview #

* Simple restful service to send emails
* Encapsulates smtp functionality
* Hides smtp details from the caller to facilitate ease of migration between smtp providers
* Service is deployed as Azure Function App to minimize hosting expenses as of 2017-03-19 3 million requests / month would cost [~$51 USD](https://azure.microsoft.com/en-ca/pricing/details/functions/)

# Smtp Provider #

* For the proof-of-concept [SendGrid on Azure](https://sendgrid.com/partners/azure/) was selected to get started
* Azure customers receive up to 25,000 emails per month for free with paid packages starting at only $9.95 per month
* Additional Pricing [Info](https://sendgrid.com/pricing/)

# Security #

* Email Service is using Azure Function App https end-point for in-transit encryption
* [SendGrid Security Policy](https://sendgrid.com/policies/security/)