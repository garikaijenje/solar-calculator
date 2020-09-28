import React, {useState, useEffect} from 'react';
import './App.css';
import data from "./appliances.json";
import Counter from './Counter'

function App() {

  const [appliances, setAppliances] = useState(data);
  const [selected, setSelected] = useState([]);
  const [totalPower, setTotalPower] = useState(0);
  const [energy, setEnergy] = useState(0);

  useEffect(() => {
    console.log(selected);

    let tp = 0;
    let e = 0;

    Object.keys(selected).map((key) => {
      
      // console.log(selected[key].watts);

      tp += selected[key].watts * selected[key].quantity;
      e += tp * selected[key].usage;

    });

    setTotalPower(tp);
    setEnergy(e);


  }, [selected])

  const removeSelected = (objectKey) => {
    let reducedObject = [];
    Object.keys(selected).map((key) => {
      if (key !== objectKey) reducedObject[key] = selected[key];
    });

    setSelected(reducedObject);
    
  };

  const updateQuantity = (objectKey, count) => {
    const newState = Object.keys(selected).map((obj) =>
      obj === objectKey
        ? {
            description: selected[obj].description,
            watts: selected[obj].watts,
            usage: selected[obj].usage,
            quantity: count,
          }
        : selected[obj]
    );
    setSelected(newState);
  };

  const updateUsage = (objectKey, count) => {
    const newState = Object.keys(selected).map((obj) =>
      obj === objectKey
        ? {
            description: selected[obj].description,
            watts: selected[obj].watts,
            quantity: selected[obj].quantity,
            usage: count,
          }
        : selected[obj]
    );
    setSelected(newState);
  };


  function isAdded(appliance){

    let status = false;
    Object.keys(selected).map((key) => {
      status = key === appliance ? false : true;
    });

    console.log(status, appliance);

    return status;

  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center">Solar Calculator</h1>

            <div className="row">
              {appliances.map((appliance, index) => (
                <div key={index} className="col-sm-4">
                  <div className="bx">
                    <h4>{appliance.description}</h4>

                    <p>
                      <strong>{appliance.watts.toLocaleString()}</strong> watts
                      <span
                        className="my-btn"
                        onClick={() =>
                          isAdded(appliance)
                            ? null
                            : setSelected([...selected, appliance])
                        }
                      >
                        {/* {isAdded(appliance) ? "Added" : "Select"} */}
                        Select
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <br />
            <br />
            <br />

            <table border="1" className="my-table">
              <thead>
                <tr>
                  <th>Appliance</th>
                  <th>Power (Watts)</th>
                  <th>Quantity</th>
                  <th>Total Power</th>
                  <th>Usage Hours</th>
                  <th>Energy (Watt Hours)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selected).map((item, index) => (
                  <tr key={index}>
                    <td>{selected[item].description}</td>
                    <td>{selected[item].watts.toLocaleString()}</td>
                    <td>
                      <Counter
                        onCountChange={(count) => updateQuantity(item, count)}
                      />
                    </td>
                    <td>
                      <strong>
                        {(
                          selected[item].watts * selected[item].quantity
                        ).toLocaleString()}
                      </strong>
                    </td>
                    <td>
                      <Counter
                        onCountChange={(usage) => updateUsage(item, usage)}
                      />
                    </td>
                    <td>
                      <strong>
                        {(
                          selected[item].watts *
                          selected[item].quantity *
                          selected[item].usage
                        ).toLocaleString()}
                      </strong>
                    </td>
                    <td className="del" onClick={() => removeSelected(item)}>
                      Remove
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <strong>{totalPower.toLocaleString()}</strong>
                  </th>
                  <th></th>
                  <th>
                    <strong>{energy.toLocaleString()}</strong>
                  </th>
                </tr>
              </tfoot>
            </table>

            <br />
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
