import express from 'express';
import casual from 'casual';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = process.env.PORT || 3001;

let info = [];

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'p')));
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  console.log('POST request received at /submit');
  const { firstNameChecked, lastNameChecked, namePrefixChecked, addressChecked, cityChecked, titleChecked, emailChecked, userChecked, phoneChecked, birthdayChecked, colorChecked, agentChecked } = req.body;
  console.log('Request Body:', req.body);

  info = [];

  if(firstNameChecked){info.push("First name: " + casual.first_name);}
  if(lastNameChecked){info.push("Last name: " + casual.last_name);}
  if(namePrefixChecked){info.push("Name prefix: " + casual.name_prefix);}
  if(addressChecked){info.push("Address: " + casual.address);}
  if(cityChecked){info.push("City: " + casual.city);}
  if(emailChecked){info.push("Email: " + casual.email);}
  if(userChecked){info.push("User: " + casual.username);}
  if(phoneChecked){info.push("Phone: " + casual.phone);}
  if(birthdayChecked){info.push("Birth year: " + casual.year);}
  if(colorChecked){info.push("Favorite Color: " + casual.color_name);}
  if(agentChecked){info.push("Agent: " + casual.user_agent);}

  const generatedSentence = info.join('<br>');
  console.log('Generated Sentence:', generatedSentence);

  res.json({ result: generatedSentence });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});