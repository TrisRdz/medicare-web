import { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { BASE_URL } from '../../constants';
import { symptoms } from '../../constants/symptoms';

const removeEmpty = (selectedSymptoms) => {
  const validSymptoms = selectedSymptoms.filter((symptom) => symptom !== '');
  return validSymptoms;
}

const formatItem = (item) => item.replaceAll('_', ' ');

function HomePage() {
  const fetchPrediction = async () => {
    const validSymptoms = removeEmpty(selectedSymptoms);
    if (!validSymptoms.length) {
      setError('Enter atleast one symptom')
      return;
    }
    const formattedSymptoms = validSymptoms.map((validSymptom) => symptoms.find((symptom) => symptom.label === validSymptom).value);
    console.log(formattedSymptoms);
    const responseJSON = await fetch(`${BASE_URL}/check_disease`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedSymptoms)
    });
    const response = await responseJSON.json();
    setPrediction(response.result);
  }

  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(5).fill(''));
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const shouldItemRender = (item, value) => {
    if (selectedSymptoms.includes(item)) {
      return false
    }
    const formattedItem = formatItem(item.label).toLowerCase();
    return formattedItem.includes(value.toLowerCase())
  };

  const addNewSymptom = () => {
    setSelectedSymptoms([...selectedSymptoms, ''])
  }

  const onValueChanged = (value, index) => {
    setError('');
    setSelectedSymptoms(currentSelected => {
      const selectedCopy = [...currentSelected];
      selectedCopy[index] = value;
      return selectedCopy;
    })
  }

  return (
    <div>
      <h1>Select Symptoms</h1>
      <h3>Select the symptoms you are facing so that we can issue a diagnosis</h3>
      <div>
        {selectedSymptoms.map((selectedSymptom, index) => (
          <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
            <p style={{ marginRight: 10, width: 100 }}>Symptom {index + 1} :</p>
            <Autocomplete
              getItemValue={(item) => item.label}
              items={symptoms}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white', textTransform: 'capitalize' }} key={item.label}>
                  {item.label}
                </div>
              }
              value={selectedSymptom}
              onChange={e => onValueChanged(e.target.value, index)}
              onSelect={(value) => onValueChanged(value, index)}
              shouldItemRender={shouldItemRender}
              wrapperStyle={{ display: 'block' }}
              inputProps={{ style: { padding: 5, borderRadius: 3, height: '100%' }, placeholder: 'Select symptom' }}
            />
          </div>
        ))}
      </div>
      {!!error && <p style={{ color: 'red' }}>
          {error}
        </p>}
      {selectedSymptoms.length < 10 && <button className='secondaryButton' style={{ marginBottom: 10 }} onClick={addNewSymptom}>
        ADD +
      </button>}
      <button onClick={fetchPrediction} className='primaryButton'>Submit</button>
      {!!prediction && <p>
        You might be having: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{prediction}</span>
      </p>}
    </div>
  );
}

export default HomePage;
