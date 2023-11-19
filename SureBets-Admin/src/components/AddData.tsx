import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { app } from './Data/FirebaseAuthentication'; // Import Firebase config

const AddOddsComponent = () => {
  const [rows, setRows] = useState(1); // State to track the number of text box rows
  const [textData, setTextData] = useState([{ home: '', away: '', one: '', x: '', two: '' }]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    const newData = [...textData];
    newData[index][name as keyof typeof newData[number]] = e.target.value;
    setTextData(newData);
  };

  const handleSendClick = async () => {
    const filledBoxes = textData.filter(
      data =>
        data.home !== '' && data.away !== '' && data.one !== '' && data.x !== '' && data.two !== ''
    );

    if (filledBoxes.length === textData.length) {
      const db = getDatabase(app);

      textData.forEach(data => {
        Object.keys(data).forEach(key => {
          const childRef = ref(db, `Parent node ${rows}/${key}`); // Assuming 'rows' signifies the parent node number
          push(childRef, data[key as keyof typeof data]);
        });
      });

      // Clear text boxes after successful upload
      setTextData([{ home: '', away: '', one: '', x: '', two: '' }]);
      setRows(prevRows => prevRows + 1);
    } else {
      // Display error message if some text boxes are not filled
      alert('Some text boxes are not filled.');
    }
  };

  const handlePlusClick = () => {
    setRows(prevRows => prevRows + 1);
    setTextData(prevData => [
      ...prevData,
      { home: '', away: '', one: '', x: '', two: '' },
    ]);
  };

  return (
    <div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          <input
            type="text"
            value={textData[rowIndex].home}
            onChange={e => handleInputChange(e, rowIndex, 'home')}
          />
          <input
            type="text"
            value={textData[rowIndex].away}
            onChange={e => handleInputChange(e, rowIndex, 'away')}
          />
          <input
            type="text"
            value={textData[rowIndex].one}
            onChange={e => handleInputChange(e, rowIndex, 'one')}
          />
          <input
            type="text"
            value={textData[rowIndex].x}
            onChange={e => handleInputChange(e, rowIndex, 'x')}
          />
          <input
            type="text"
            value={textData[rowIndex].two}
            onChange={e => handleInputChange(e, rowIndex, 'two')}
          />
        </div>
      ))}
      <button onClick={handleSendClick}>Send</button>
      <button onClick={handlePlusClick}>+</button>
    </div>
  );
};

export default AddOddsComponent;