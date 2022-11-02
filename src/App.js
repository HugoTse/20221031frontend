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
  Tabs,
  Radio,
  RadioGroupField,
  Icon
} from "@aws-amplify/ui-react";

import React, {
  useState,
  useEffect,
} from "react";

// Table theme
const theme: Theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.blue.20}' },
          },

          striped: {
            backgroundColor: { value: '{colors.blue.10}' },
          },
        },

        header: {
          color: { value: '{colors.blue.80}' },
          fontSize: { value: '{fontSizes.xl}' },
        },

        data: {
          fontWeight: { value: '{fontWeights.semibold}' },
        },
      },
    },
  },
};


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
    setLowerdate('');
    setUpperdate('');
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
        fetchRecords();
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


  // Fetch the records in the table
  async function fetchRecords(){
    const myHeaders = {
      "Content-Type": "application/json",
    }
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };
    // Instantiate a request url
    var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/fileread?username="+loggedinusername+"&password="+loggedinpassword+"&upperdate="+upperdate+"&lowerdate="+lowerdate;
    console.log(url);
    const apiResponse = await fetch(url, requestOptions)
    // const apiResponse = await fetch('http://api.open-notify.org/astros.json', {headers} )
    const apiResponseJSON = await apiResponse.json()
    console.log(apiResponseJSON);
    // const rs = apiResponseJSON.body
    // console.log(rs)
    // setRecords([...rs])
    setRecords([...apiResponseJSON])
  }
  // fetchRecords();
  // Fetch the records in the table: UseEffect
  useEffect(() => { 
    async function fetchRecords(){
      const myHeaders = {
        "Content-Type": "application/json",
      }
      // create a JSON object with parameters for API call and store in a variable
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      // Instantiate a request url
      var url = "https://1889vnphkf.execute-api.us-west-1.amazonaws.com/v0/fileread?username="+loggedinusername+"&password="+loggedinpassword+"&upperdate="+upperdate+"&lowerdate="+lowerdate;
      console.log(url);
      const apiResponse = await fetch(url, requestOptions)
      // const apiResponse = await fetch('http://api.open-notify.org/astros.json', {headers} )
      const apiResponseJSON = await apiResponse.json()
      console.log(apiResponseJSON);
      // const rs = apiResponseJSON.body
      // console.log("This is rs: " + rs)
      // setRecords([...rs])
      setRecords([...apiResponseJSON])
    }
    fetchRecords()
  }, []);


  // Set the user filter
  async function setUser(file){
    console.log(file.file.user.S);
    setUserfilter(file.file.user.S);
    setFilefilter('');
  }
  // Search user filter
  async function searchUser(u){
    console.log(u);
    setUserfilter(u);
    setFilefilter('');
  }
  // Set the file filter
  async function setFile(file){
    console.log(file.file.file.S);
    setFilefilter(file.file.file.S);
    setUserfilter('');
  }
  // Set the file filter
  async function searchFile(f){
    console.log(f);
    setFilefilter(f);
    setUserfilter('');
  }
  // Set the lowerdate
  const handleLowerchange = (e) => {
    console.log(e.target.value)
    setLowerdate(e.target.value);
  };
  // Set the upperdate
  const handleUpperchange = (e) => {
    console.log(e.target.value)
    setUpperdate(e.target.value);
  };
  // Clear filters
  async function clearfilters(){
    setUserfilter('');
    setFilefilter('');
    setLowerdate('');
    setUpperdate('');
  }
  


  return (
    <div className="App">

      {/* Click the ransomware defender title to fetch records again */}
      <Heading level={1} onClick={e =>fetchRecords(e)} >Ransomware Defender</Heading>
      {/* <Heading level={1} >Ransomware Defender</Heading> */}
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


        {/* Date filters */}
        <div className='datediv'>
        <SelectField label="Latest files" name="" onChange={handleUpperchange}>
          {records.length > 0 ? (records.map((file) => 
          <>
            <option value={file.lastmodified.S}>{file.lastmodified.S}</option>
          </>)) : (<></>)}
        </SelectField>
        </div>
        <div className='datediv'>
        <SelectField label="Earliest files" name="" onChange={handleLowerchange}>
          {records.length > 0 ? (records.map((file) => 
          <>
            <option value={file.lastmodified.S}>{file.lastmodified.S}</option>
          </>)) : (<></>)}
        </SelectField>
        <br/>
        </div>
     

        {/* Search by filename */}
        <SearchField
          label="Search"
          placeholder="Search by file name..."
          onChange={e => searchFile(e.target.value)}
          // onClick=
        />
        <br/>


        {/* Search by user - only for owners and admnistrators */}
        {loggedinaccounttype != 'user' ? (<>
          <SearchField
            label="Search"
            placeholder="Search by user name..."
            onChange={e => searchUser(e.target.value)}
          />
        <br/>
        </>) : (<></>)}
        
        
        
        {/* Show what the owner sees */}
        {loggedinaccounttype == 'owner' ? (<>
          <ThemeProvider theme={theme} colorMode="light">
            <Table highlightOnHover variation="striped">
              <TableHead>
                <TableRow>
                  <TableCell as="th">FILE FILTER</TableCell>
                  <TableCell as="th">FILE NAME</TableCell>
                  <TableCell as="th">MODIFIED TIME</TableCell>
                  <TableCell as="th">UPLOAD TIME</TableCell>
                  <TableCell as="th">DOWNLOADED</TableCell>
                  <TableCell as="th">
                    <Button backgroundColor="purple" color="white" onClick={clearfilters}>CLEAR</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length > 0 ? (records.map((file) => 
                <>
                  <TableRow>
                    <TableCell>
                      <Button onDoubleClick={() => setFile({file})}> {file.file.S}</Button>
                    </TableCell>
                    <TableCell>
                      <a href={'https://20221024bucket.s3.us-west-1.amazonaws.com/'+file.s3Filename.S}>{file.file.S}</a>
                    </TableCell>
                    <TableCell>
                      {file.lastmodified.S}
                    </TableCell>
                    <TableCell>
                      {file.timestamp.S}
                    </TableCell>
                    <TableCell as="th">
                      {file.downloaded.S.includes(loggedinusername) ? (<><Icon size="Large" ariaLabel="Flag" pathData="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></>) : (<></>)}
                    </TableCell>
                    <TableCell>
                      <Button onDoubleClick={() => setUser({file})}> {file.user.S}</Button>
                    </TableCell>
                  </TableRow>
                </>)) : (<></>)}
              </TableBody>
            </Table>
          </ThemeProvider>
        </>) : (<></>)}


        {loggedinaccounttype == 'administrator' ? (<>
          <p>Administrator</p>
        </>) : (<></>)}
        {loggedinaccounttype == 'user' ? (<>
          <p>User</p>

        </>) : (<></>)}

        {/* Show filtered table & table body */}
        {records.length > 0 ? (records.map((file) => 
          <>
            {/* If owner */}

            {/* If administrator */}

            {/* If user */}
          </>)) : (<></>)}


      </>)}
      
      <br/>
      <br/>
    </div>
  );
}

export default App;
