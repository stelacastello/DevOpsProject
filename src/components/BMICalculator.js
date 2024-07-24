import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [BMI, setBMI] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      return weight / (heightInMeters * heightInMeters);
    }
    return null;
  };

  const getCategory = (BMIValue) => {
    if (BMIValue < 18.5) return 'Underweight';
    if (BMIValue >= 18.5 && BMIValue <= 24.9) return 'Normal';
    if (BMIValue > 24.9 && BMIValue <= 30) return 'Overweight';
    return 'Obese (Class I)';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const BMIValue = calculateBMI();
    if (BMIValue !== null) {
      setBMI(BMIValue.toFixed(2));
    }
  };

  const category = BMI !== null ? getCategory(Number(BMI)) : null;

  return (
    <div className="container">
      <h1 className="mt-5">Joaos BMI Calculator</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Calculate BMI</button>
      </form>
      {BMI !== null && (
        <div className="mt-4">
          <h3>Your BMI is: {BMI} kg/m2</h3>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Type</th>
                <th>BMI</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {['Underweight', 'Normal', 'Overweight', 'Obese (Class I)'].map((type) => {
                const isActive = type === category;
                let BMIRange, weightRange;

                switch (type) {
                  case 'Underweight':
                    BMIRange = '< 18.5';
                    weightRange = '< 56.7 Kg';
                    break;
                  case 'Normal':
                    BMIRange = '18.5 a 24.9';
                    weightRange = '56.7 a 76.3 Kg';
                    break;
                  case 'Overweight':
                    BMIRange = '24.9 a 30';
                    weightRange = '76.3 a 91.9 Kg';
                    break;
                  case 'Obese (Class I)':
                    BMIRange = '> 30';
                    weightRange = '> 91.9 Kg';
                    break;
                  default:
                    BMIRange = '';
                    weightRange = '';
                }

                return (
                  <tr key={type} className={isActive ? 'table-primary' : ''}>
                    <td>{type}</td>
                    <td>{BMIRange}</td>
                    <td>{weightRange}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;