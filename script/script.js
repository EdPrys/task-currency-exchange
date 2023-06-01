const url =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";
let usdRate, eurRate;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const rates = data.filter((item) => item.cc === "USD" || item.cc === "EUR");

    usdRate = rates.find((item) => item.cc === "USD").rate;
    eurRate = rates.find((item) => item.cc === "EUR").rate;

    //*************************HEADER******************
    const currencyMarquee = document.getElementById("currencyMarquee");
    currencyMarquee.innerHTML = `Курс USD: ${usdRate} || Курс EUR: ${eurRate}`;

    //************************MAIN*****************
    const numberInput1 = document.getElementById("numberInput1");
    const currencySelect1 = document.getElementById("currencySelect1");

    const numberInput2 = document.getElementById("numberInput2");
    const currencySelect2 = document.getElementById("currencySelect2");

    numberInput1.addEventListener("input", function () {
      validateInput1();
      convertCurrency();
    });

    numberInput2.addEventListener("input", function () {
      validateInput2();
      convertCurrency();
    });
    //----------------------VALIDATION---------------------
    function validateInput1() {
      const errorMessage1 = document.getElementById("errorMessage1");
      const inputValue = numberInput1.value.trim();

      if (inputValue === "") {
        errorMessage1.textContent = "";
      } else if (!/^\d+$/.test(inputValue)) {
        errorMessage1.textContent = "Введено недійсне число";
      } else {
        errorMessage1.textContent = "";
      }
    }

    function validateInput2() {
      const errorMessage2 = document.getElementById("errorMessage2");
      const inputValue = numberInput2.value.trim();

      if (inputValue === "") {
        errorMessage2.textContent = "";
      } else if (!/^\d+$/.test(inputValue)) {
        errorMessage2.textContent = "Введено недійсне число";
      } else {
        errorMessage2.textContent = "";
      }
    }
    //----------------------CONVERT---------------------
    function convertCurrency() {
      const inputValue1 = numberInput1.value.trim();
      const inputValue2 = numberInput2.value.trim();

      if (inputValue1 !== "" && /^\d+$/.test(inputValue1)) {
        const selectedCurrency1 = currencySelect1.value;
        const selectedCurrency2 = currencySelect2.value;

        let convertedValue;

        if (selectedCurrency1 === "USD" && selectedCurrency2 === "EUR") {
          convertedValue = (inputValue1 / usdRate) * eurRate;
        } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "USD") {
          convertedValue = (inputValue1 / eurRate) * usdRate;
        } else if (selectedCurrency1 === "USD" && selectedCurrency2 === "UAH") {
          convertedValue = inputValue1 * usdRate;
        } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "USD") {
          convertedValue = inputValue1 / usdRate;
        } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "UAH") {
          convertedValue = inputValue1 * eurRate;
        } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "EUR") {
          convertedValue = inputValue1 / eurRate;
        } else {
          convertedValue = inputValue1;
        }

        numberInput2.value = parseFloat(convertedValue).toFixed(2);
      } else if (inputValue2 !== "" && /^\d+$/.test(inputValue2)) {
        const selectedCurrency1 = currencySelect1.value;
        const selectedCurrency2 = currencySelect2.value;

        let convertedValue;

        if (selectedCurrency1 === "USD" && selectedCurrency2 === "EUR") {
          convertedValue = (inputValue2 / usdRate) * eurRate;
        } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "USD") {
          convertedValue = (inputValue2 / eurRate) * usdRate;
        } else if (selectedCurrency1 === "USD" && selectedCurrency2 === "UAH") {
          convertedValue = inputValue2 * usdRate;
        } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "USD") {
          convertedValue = inputValue2 / usdRate;
        } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "UAH") {
          convertedValue = inputValue2 * eurRate;
        } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "EUR") {
          convertedValue = inputValue2 / eurRate;
        } else {
          convertedValue = inputValue2;
        }

        numberInput1.value = parseFloat(convertedValue).toFixed(2);
      }
    }
  })
  .catch((error) => {
    console.log("Error:", error);
  });

//React
// import React, { useState } from 'react';

// const CurrencyConverter = () => {
//   const [inputValue1, setInputValue1] = useState('');
//   const [inputValue2, setInputValue2] = useState('');
//   const [selectedCurrency1, setSelectedCurrency1] = useState('USD');
//   const [selectedCurrency2, setSelectedCurrency2] = useState('USD');
//   const [usdRate, setUsdRate] = useState(0);
//   const [eurRate, setEurRate] = useState(0);

//   // Функція для отримання курсу валют з сервера
//   const fetchCurrencyRates = () => {
//     const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const rates = data.filter(item => item.cc === "USD" || item.cc === "EUR");
//         setUsdRate(rates.find(item => item.cc === "USD").rate);
//         setEurRate(rates.find(item => item.cc === "EUR").rate);
//       })
//       .catch(error => console.log("Error:", error));
//   };

//   // Функція для конвертації валют
//   const convertCurrency = () => {
//     const value1 = parseFloat(inputValue1);

//     if (!isNaN(value1)) {
//       let convertedValue;

//       if (selectedCurrency1 === "USD" && selectedCurrency2 === "EUR") {
//         convertedValue = (value1 / usdRate) * eurRate;
//       } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "USD") {
//         convertedValue = (value1 / eurRate) * usdRate;
//       } else if (selectedCurrency1 === "USD" && selectedCurrency2 === "UAH") {
//         convertedValue = value1 * usdRate;
//       } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "USD") {
//         convertedValue = value1 / usdRate;
//       } else if (selectedCurrency1 === "EUR" && selectedCurrency2 === "UAH") {
//         convertedValue = value1 * eurRate;
//       } else if (selectedCurrency1 === "UAH" && selectedCurrency2 === "EUR") {
//         convertedValue = value1 / eurRate;
//       } else {
//         convertedValue = value1;
//       }

//       setInputValue2(convertedValue.toFixed(2));
//     }
//   };

//   // Обробник події для першого введеного числа
//   const handleInput1Change = (event) => {
//     setInputValue1(event.target.value);
//     convertCurrency();
//   };

//   // Обробник події для другого введеного числа
//   const handleInput2Change = (event) => {
//     setInputValue2(event.target.value);
//     convertCurrency();
//   };

//   // Обробник події для вибору першої валюти
//   const handleCurrency1Change = (event) => {
//     setSelectedCurrency1(event.target.value);
//     convertCurrency();
//   };

//   // Обробник події для вибору другої валюти
//   const handleCurrency2Change = (event) => {
//     setSelectedCurrency2(event.target.value);
//     convertCurrency();
//   };

//   // Завантажуємо курси валют при монтажі компонента
//   useEffect(() => {
//     fetchCurrencyRates();
//   }, []);

//   return (
//     <div className="currency-converter">
//       <div className="input-wrapper">
//         <input type="text" value={inputValue1} onChange={handleInput1Change} placeholder="Введіть число" />
//         <select value={selectedCurrency1} onChange={handleCurrency1Change}>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="UAH">UAH</option>
//         </select>
//       </div>
//       <div className="input-wrapper">
//         <input type="text" value={inputValue2} onChange={handleInput2Change} placeholder="Введіть число" />
//         <select value={selectedCurrency2} onChange={handleCurrency2Change}>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="UAH">UAH</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;
