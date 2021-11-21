

function showConversionDropDown() {
    document.getElementById('conversionDropDown').classList.toggle("show");
}


function doFetchConvert() {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=f58d57ee49a2e5f691b3e5bcfd94f338&format=1')
    .then(response => response.json())
    .then(jsonData => {
        let output = document.querySelector('#conversionDropDown');
        for(key in jsonData['rates']) {
            let names = document.createElement('button');
            names.setAttribute('id', key);
            names.setAttribute('onClick', "selectConversionCurrency(this.id)");
            names.append(key);
            output.appendChild(names);
        }
    });
}

conversionCurrencies = [];
currency = ['EUR'];

// selects the currencies to convert to
/*  This function selects which currencies to convert to with the buttons.
    When a button is clicked, the id of the button is stored in an array and is highlighted.
    The array is how the program will know which currencies to convert to.
    When the same button is clicked again, the id gets removed from the array and the button
    turns back to white.
 */
function selectConversionCurrency(clicked_id) {
    let currencyName = clicked_id;
    conversionCurrencies.push(currencyName);
    content = document.getElementById('maincontent');
    content.innerHTML = "";
    let numbers = [];

    removeDuplicate(conversionCurrencies);
    

    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=f58d57ee49a2e5f691b3e5bcfd94f338&format=1')
        .then(response => response.json())
        .then(jsonData => {  
            for(let conversionCurrency of conversionCurrencies) {

                buttonColor = document.getElementById(conversionCurrency);
                numbers.push(jsonData['rates'][conversionCurrency]);
                max = Math.max.apply(null, numbers)

                if(conversionCurrencies.includes(conversionCurrency)) {
                    console.log('turning green:', conversionCurrency);
                    console.log('currencyName: ', currencyName)

                    buttonColor.style.background = 'lightgreen';
                    let height = (1 / jsonData['rates'][conversionCurrency]) * 100;
                    let chart = document.createElement('div');
                    content.appendChild(chart);
                    chart.setAttribute('class', 'BarChart-bar')
                    chart.setAttribute('onClick', "alert('1 EUR = " + jsonData['rates'][conversionCurrency] + " " + conversionCurrency + "')");
                    chart.setAttribute('style', "height: calc(" + height + "%/" + max + ")");
                    chart.innerHTML += conversionCurrency;


                } 

                console.log("1", currency[0], "=", jsonData['rates'][conversionCurrency], conversionCurrency);        
            }
        });



    if(!conversionCurrencies.includes(currencyName)) {
        console.log('turning white: ', currencyName);
        buttonColor.style.background = 'white';
        content.innerHTML -= currencyName;
    }


    console.log("Conversion currencies: ", conversionCurrencies);
    
}



// function to check duplicates in array and removes them with removeItemAll function
function removeDuplicate(arr){
    let result = false;
    // iterate over the array
    for(let i = 0; i < arr.length;i++) {
       // compare the first and last index of an element
       if(arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])){
          result = true;
          if(result) {
            removeItemAll(arr, arr[i]);
            } 
       }
    }
}


// function to remove the duplicates in an array
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
}


















