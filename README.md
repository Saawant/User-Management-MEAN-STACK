# User Management based on MEAN STACK


-> Download index.js & package.json
-> Run 'npm install' in the directory to install dependencies
-> To run the server type :
    node index.js usersDatabase usersCollection 10000
  where;  usersDatabase     - name of the db you want to associate in mongodb
          usersCollection   - name of the collection in mongodb
          10000             - port



  List of RESTful APIs :

  1) POST (/signup) :
      To create the user with the following information:
      username , password  , email , dob , name
      supplied in the JSON format.

  2) POST (/login)  :
      For user login :
      username & password supplied in JSON format.

  3) GET (/users/:userName) :
      To get user details. Username must be supplied in the URL.

  4) POST (/updateInfo) :
      To update user details.
      Only name,email and dob can be changed as of now.  



Uses bcrypt for password hashing.
