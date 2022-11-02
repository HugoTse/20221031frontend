import '@aws-amplify/ui-react/styles.css';

import {
  withAuthenticator,
  PasswordField,
  ButtonGroup,
  Button,
  Heading,
  Image,
  View,
  Card,
  Grid,
  TextField,
  Alert,
  Flex,
  Badge,
  Text,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  ThemeProvider,
  Theme,
  SliderField,
  TextAreaField,
  SelectField,
  SwitchField,
  SearchField,
  useTheme,
  Divider,
  ToggleButton,
  TabItem,
  Tabs
} from "@aws-amplify/ui-react";

import React, {
  useState,
  useEffect,
} from "react";



function App() {
  // const indicating whether user is logged in
  const[logged, setLogged] = useState('');

  // consts for creating account
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[organizationid, setOrganizationid] = useState('');

  // consts for logging in
  const[loginusername, setLoginusername] = useState('');
  const[loginpassword, setLoginpassword] = useState('');

  // consts after logging in
  const[loggedinusername, setLoggedinusername] = useState('');
  const[loggedinpassword, setLoggedinpassword] = useState('');
  const[loggedinaccounttype, setLoggedinaccounttype] = useState('');
  const[loggedinorganizationid, setLoggedinorganizationid] = useState('');

  // consts for the files
  const [records, setRecords] = useState([]);

  // consts for user and file filter
  const[userfilter, setUserfilter] = useState('');
  const[filefilter, setFilefilter] = useState('');

  // consts for date filter
  const[upperdate, setUpperdate] = useState('');
  const[lowerdate, setLowerdate] = useState('');
  

  // Function for logging out
  async function logout(e){
    e.preventDefault();
    setLogged('');
    setLoggedinusername('');
    setLoggedinpassword('');
    setLoggedinaccounttype('');
    setLoggedinorganizationid('');
    // Resetting filters
    setUserfilter('');
    setFilefilter('');
    console.log('Now logged out');
  }


  // Function for logging in
  async function login(e){
    e.preventDefault();
    // Make sure username and password are filled in
    if(loginusername != '' && loginpassword != ''){
      console.log('The login username is: ' + loginusername);
      console.log('The login password is: ' + loginpassword);
      
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // Instantiate a request url
      var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/login?username="+loginusername+"&password="+loginpassword;
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      // Make the API call
      const apiResponse = await fetch(url, requestOptions )
      const apiResponseJSON = await apiResponse.json()
      if(apiResponseJSON.Found == 'False'){
        alert('Please try logging again.')
      }
      if(apiResponseJSON.Found == 'True'){
        setLogged(apiResponse.username)
        setLoggedinusername(apiResponseJSON.username);
        setLoggedinpassword(apiResponseJSON.password);
        setLoggedinorganizationid(apiResponseJSON.organizationid);
        setLoggedinaccounttype(apiResponseJSON.accounttype);
        console.log('loggedinusername = ' + loggedinusername);
        console.log('loggedinpassword = ' + loggedinusername);
        console.log('loggedinorganizationid = ' + loggedinorganizationid);
        console.log('loggedinaccounttype = ' + loggedinaccounttype);
        // Immediately fetch records before losing the variables
        // fetchRecords();
      }
      console.log('Now logged in');
    }
  }


  // Function for creating an owner account
  async function createOwneraccount(e){
    if(username != '' && password != ''){
      console.log('The username is ' + username);
      console.log('The password is ' + password);
      console.log('The organization ID is ' + organizationid);

      // Instantiate a request url
      var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/createaccount?username="+username+"&password="+password+"&organizationid="+organizationid+"&accounttype=owner";
      console.log(url);
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      // make API call with parameters and use promises to get response
      await fetch(url, requestOptions)
        .then((response) => response.text())
        // .then((result) => alert(JSON.parse(result).body))
        .catch((error) => console.log("error", error));

      setUsername('');
      setPassword('');
      setOrganizationid('');
      alert("You have created an owner account");
    }
  }


  // Function for creating an administrator account
  async function createAdministratoraccount(e){
    if(username != '' && password != '' && organizationid != ''){
      console.log('The username is ' + username);
      console.log('The password is ' + password);
      console.log('The organization ID is ' + organizationid);

      // Instantiate a request url
      var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/createaccount?username="+username+"&password="+password+"&organizationid="+organizationid+"&accounttype=administrator";
      console.log(url);
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      // make API call with parameters and use promises to get response
      await fetch(url, requestOptions)
        .then((response) => response.text())
        // .then((result) => alert(JSON.parse(result).body))
        .catch((error) => console.log("error", error));

      setUsername('');
      setPassword('');
      setOrganizationid('');
      alert("You have created a new administrator account");
    }
  }


  // Function for creating a user account
  async function createUseraccount(e){
    if(username != '' && password != '' && organizationid != ''){
      console.log('The username is ' + username);
      console.log('The password is ' + password);
      console.log('The organization ID is ' + organizationid);

      // Instantiate a request url
      var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/createaccount?username="+username+"&password="+password+"&organizationid="+organizationid+"&accounttype=user";
      console.log(url);
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      // make API call with parameters and use promises to get response
      await fetch(url, requestOptions)
        .then((response) => response.text())
        // .then((result) => alert(JSON.parse(result).body))
        .catch((error) => console.log("error", error));

      setUsername('');
      setPassword('');
      setOrganizationid('');
      alert("You have created a new user account");
    }
  }


  return (
    <div className="App">

      {/* Click the ransomware defender title to fetch records again */}
      {/* <Heading level={1} onClick={e =>fetchRecords(e)} >Ransomware Defender</Heading> */}
      <Heading level={1} >Ransomware Defender</Heading>
      <h4><i>"Using processes, people, and technology to keep your files safe"</i></h4>

      {/* If not logged in, show this */}
      {logged == ''? (<>
        <Card variation="outlined">
          <div className='login'>
            <Tabs>
              <TabItem title="Login">
                <br/>
                <TextField
                  label="Username"
                  onChange={e => setLoginusername(e.target.value)}
                />
                <br/>
                <PasswordField
                  label="Password"
                  name="password"
                  size="medium"
                  onChange={e => setLoginpassword(e.target.value)}
                />
                <br/>
                <ButtonGroup variation="primary">
                  <Button variation='primary'onClick={e =>login(e)}>LOG IN</Button>
                </ButtonGroup>
              </TabItem>

              <TabItem title="Create Account">
                <br/>
                <TextField
                  label="Username"
                  onChange={e => setUsername(e.target.value)}
                />
                <br/>
                <PasswordField
                  label="Password"
                  name="password"
                  size="medium"
                  onChange={e => setPassword(e.target.value)}
                />
                <br/>
                <TextField
                  label="Organization ID (for administrators and users)"
                  onChange={e => setOrganizationid(e.target.value)}
                />
                <br/>
                <p>Choose your type of account:</p>
                <ButtonGroup variation="primary">
                  <Button variation='primary'onClick={e =>createOwneraccount(e)}>Owner</Button>
                  <Button variation='primary'onClick={e =>createAdministratoraccount(e)}>Administrator</Button>
                  <Button variation='primary' onClick={e =>createUseraccount(e)}>User</Button>
                </ButtonGroup>
              </TabItem>
            </Tabs>
          </div>
        </Card>
        <br/>
      </>):
      
      // If logged in, show this
      (<>
        <Card>
          <Button variation='primary'
          onClick={logout}
          >LOG OUT</Button>
        </Card>
        <Card>
          <Badge variation="info" size="large"> Username: &nbsp; <b>{loggedinusername}</b> </Badge>
          &nbsp; &nbsp;
          <Badge variation="warning" size="large"> Account Type: &nbsp; <b>{loggedinaccounttype}</b> </Badge>
          &nbsp; &nbsp;
          <Badge variation="success" size="large"> Organization ID: &nbsp; <b>{loggedinorganizationid}</b> </Badge>
        </Card>
        <br/>
        <br/>
      </>)}
      
    </div>
  );
}

export default App;