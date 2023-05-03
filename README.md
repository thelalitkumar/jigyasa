### Host frontent to backend server
```
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
```

### Host frontent and backend seperately
```
const cors = require("cors");
app.use(cors()); //to connect frontend port
```
