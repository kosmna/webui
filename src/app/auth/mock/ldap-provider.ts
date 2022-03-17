export const AuhtProvider = [
    {
      'bindDN': 'cn=Manager,dc=example,dc=com',
      'bindDNPassword': '*******',
      'groupAttrGroup': 'member',
      'groupAttrName': 'cn',
      'groupAttrUser': 'DN',
      'groupFilter': '(&(objectClass=top)(objectClass=posixGroup))',
      'groupSearchBaseDN': 'ou=Groups,dc=example,dc=com',
      'groupSearchScope': 'sub',
      'host': 'example.com',
      'id': '822a584e-09f9-46f7-a99c-52f3ea2a2dc3',
      'name': 'Company LDAP',
      'port': 636,
      'tls': true,
      // tslint:disable-next-line:max-line-length
      'tlsRootCA': '-----BEGIN CERTIFICATE-----\nMIIGDjCCA/agAwIBAgIQNoJef7WkgZN+9tFza7k8pjANBgkqhkiG9w0BAQwFADCB\nhTELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G\nADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwGwYDVR0gBBQwEjAGBgRV\nHSAAMAgGBmeBDAECAjBMBgNVHR8ERTBDMEGgP6A9hjtodHRwOi8vY3JsLmNvbW9k\nb2NhLmNvbS9DT01PRE9SU0FDZXJ0aWZpY2F0aW9uQXV0aG9yaXR5LmNybDBxBggr\n...\n4J6ijvyxFnlcIdNFgZoMOWxtKNcl0rcRkND23m9e9Pqki2Z3ci+bkEAsUhJg+f+1\ncC6JmnkJiYEt7Fx4b4GH8fxV\n-----END CERTIFICATE-----',
      'type': 'ldap2307',
      'userAttrFirstName': 'givenName',
      'userAttrID': 'uidNumber',
      'userAttrLastName': 'sn',
      'userAttrUsername': 'uid',
      'userFilter': '(&(objectClass=top)(objectClass=inetOrgPerson)(objectClass=posixAccount))',
      'userSearchBaseDN': 'ou=People,dc=example,dc=com',
      'userSearchScope': 'sub'
    },
    {
        'bindDN': 'cn=Manager,dc=example,dc=com',
        'bindDNPassword': '*******',
        'groupAttrGroup': 'member',
        'groupAttrName': 'cn',
        'groupAttrUser': 'DN',
        'groupFilter': '(&(objectClass=top)(objectClass=posixGroup))',
        'groupSearchBaseDN': 'ou=Groups,dc=example,dc=com',
        'groupSearchScope': 'sub',
        'host': 'example.com',
        'id': '822a584e-09f9-46f7-a99c-52f3ea2a2dc3',
        'name': 'Company LDAP',
        'port': 636,
        'tls': true,
        // tslint:disable-next-line:max-line-length
        'tlsRootCA': '-----BEGIN CERTIFICATE-----\nMIIGDjCCA/agAwIBAgIQNoJef7WkgZN+9tFza7k8pjANBgkqhkiG9w0BAQwFADCB\nhTELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G\nADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwGwYDVR0gBBQwEjAGBgRV\nHSAAMAgGBmeBDAECAjBMBgNVHR8ERTBDMEGgP6A9hjtodHRwOi8vY3JsLmNvbW9k\nb2NhLmNvbS9DT01PRE9SU0FDZXJ0aWZpY2F0aW9uQXV0aG9yaXR5LmNybDBxBggr\n...\n4J6ijvyxFnlcIdNFgZoMOWxtKNcl0rcRkND23m9e9Pqki2Z3ci+bkEAsUhJg+f+1\ncC6JmnkJiYEt7Fx4b4GH8fxV\n-----END CERTIFICATE-----',
        'type': 'ldap2307',
        'userAttrFirstName': 'givenName',
        'userAttrID': 'uidNumber',
        'userAttrLastName': 'sn',
        'userAttrUsername': 'uid',
        'userFilter': '(&(objectClass=top)(objectClass=inetOrgPerson)(objectClass=posixAccount))',
        'userSearchBaseDN': 'ou=People,dc=example,dc=com',
        'userSearchScope': 'sub'
      }
  ];


export const GetLogin = [
  {
    'id': 'b5a6f8e4-0265-4763-8f1b-9e11dcdf99f2',
    'name': ''
  },
  {
    'id': 's-0wqewq26dsd5-4763-8f1b-9e11dcdf99f2',
    'name': 'Microsoft'
  },
  {
    'id': '933njdlu-0265-4763-8f1b-9e11dcdf99f2',
    'name': 'corp-ad@NA'
  },
  {
    'id': '83239348-0265-4763-sdsd-a122fj933920j',
    'name': 'skynet'
  }
];
