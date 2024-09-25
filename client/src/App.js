import { useRef, useState } from 'react'
import axios from 'axios';

function App() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (file) {
      formdata.append('csv', file);
    }

    try {
      let res = await axios.post('http://localhost:5000/save-data', formdata)
      console.log(res.data);
      if (res?.data?.success) {
        setData(res?.data?.data);
      }
    }
    catch (err) {
      console.log(err.data);
    }

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input ref={fileRef} accept='.csv' onChange={handleFileChange} type="file" />
        <button type='submit'>submit</button>
      </form>

      <br />
      <br />

      {/* {
        data && data.length > 0 &&
        <div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Age</td>
                <td>Country</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Salary</td>
                <td>Department</td>
              </tr>
            </thead>
            <tbody>
              {
                data?.slice(1)?.map((item, i) => {
                  return <tr key={i}>
                    {item.map((string, ind) => (
                      <>
                        <td></td>
                        <td>Age</td>
                        <td>Country</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Salary</td>
                        <td>Department</td>
                      </>
                    ))}
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      } */}
    </div>
  );
}

export default App;
