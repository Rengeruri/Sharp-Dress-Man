
const awsConfig = {
    // OPTIONAL - if your API requires authentication 
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:ebabab96-8b5e-415d-8abe-a9a739c4f71e',
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_ZjbPp7Y9s',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '6pj0e3a54scq7kuufcrc9mkq65',
    },
    API: {
      endpoints: [
        {
          name: "sdmApiTest",
          endpoint: "https://afhk19ebyk.execute-api.us-east-1.amazonaws.com/test"
        }
      ]
    },
    Storage: {
      AWSS3: {
        region: 'us-east-1',
        bucket: 'sharpdressmand95b3129052c40c582ac6770b4521fa5170224-dev'
      }
    }
  }

export default awsConfig;