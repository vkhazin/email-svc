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

# Usage #

## Configurations ##
* Create SendGrid account and get an API key with Send Email Full Access
* Replace ./email/config/default.json {SendGrid Api Key with SendMail Full Access} with value from SendGrid portal
* Replace ./email/config/default.json {secret-api-key} with your own value

## Deployment to Azure Function App ##
* Using Azure Portal create new 'Function App'
* For the template select web-hook and give your function name 'email' - the function name and folder name in the source control must match
* A sample index.js will be created and url for the web-hook will be auto-provisioned
* Here is the confusing part comes - how to deploy on demand?
* From function settings panel, select 'Function app settings' - it is in the left bottom area
* Select 'Go to App Service Settings' from the main content page
* In Service Settings select 'Deployment credentials' on the left hand
* Configure deployment username and password - it can be used for git and for ftp deployment, record password - it cannot be displayed again as far as I could find
* Back to Azure Portal find your Function App, select 'Function app settings' again
* Select 'Go to Kudu' - new page will open
* Select Kudu icon on top left
* Select 'Source control info' in the main content - it will display json with git url
* Now (finally) you can push your code to the git repo that represents Azure Function App, git url is from the 'Kudu' portal and username/password are from the 'Service Settings'

## Request ##
```
curl -X POST -H "x-api-key: {secret-api-key}" -H "Content-Type: application/json" -d '{
    "from": "vladimir.khazin@icssolutions.ca",
    "to": "vladimir.khazin@icssolutions.ca",
    "subject": "Contractor Vlad Khazin",
    "body": "<b>Please advise the contractor that his services are no more required effective immediately!</b>"
} ' "https://{your function name}.azurewebsites.net/api/email"
```

## Response ##
```
{
  "messageId": "<1489967715520.0.10416@RD0003FF9CDDD2>"
}
```