import express from 'express';
import casual from 'casual';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

let info = [];

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('POST request received at /submit');
  const { firstNameChecked, lastNameChecked, namePrefixChecked } = req.body;
  console.log('Request Body:', req.body);

  info = [];

  if(firstNameChecked){
    info[0] = "First name: " + casual.first_name;
  }
  if(lastNameChecked){
    info[1] = "Last name: " + casual.last_name;
  }
  if(namePrefixChecked){
    info[2] = "Name prefix: " + casual.name_prefix;
  }

  const generatedSentence = info.join('<br>');
  console.log('Generated Sentence:', generatedSentence);

  res.json({ result: generatedSentence });
});

function generateSentence(firstNameChecked, lastNameChecked, namePrefixChecked) {
  return casual.sentence;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});