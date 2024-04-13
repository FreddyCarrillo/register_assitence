
const apiKey = "BJsFItiZ0NyKpKxqifceJNCguMSsUCxG5epr80gDNsudisD76VW2pm69Nmna1JML";

const dataSchedule = {
  finish: '18:00'
};

let inputDni = document.getElementById('dni');

inputDni.addEventListener('input', function() {
  let value = inputDni.value;
  value = value.replace(/\D/g, '');
  value = value.substring(0, 8);
  inputDni.value = value;
});

let form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let dniValue = document.getElementById('dni').value;
  getDataDniSunat(dniValue);
});


const getDataDniSunat = async (dni) => {

  const apiUrl = `https://api.sunat.dev/dni/${dni}?apikey=${apiKey}`;
  const data = await fetch(apiUrl);
  const dataEmployee = await data.json();
  const {
    preNombres,
    apePaterno,
    apeMaterno,
  } = dataEmployee.body;

  const fullNameEmployee = `${preNombres} ${apePaterno} ${apeMaterno}`;

  const currentDate = new Date();
  const scheduleFinish = new Date();
  const [hour, minute] = dataSchedule.finish.split(':');
  scheduleFinish.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
  
  const diffInMilliseconds = scheduleFinish - currentDate;
  const diffInMinutes = Math.round(diffInMilliseconds / 60000);

  if(diffInMinutes <= 0){
    getAlertSuccess(fullNameEmployee);
  }else{
    getAlertWarning(fullNameEmployee);
  }

}


const getAlertSuccess = (nameEmployee) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Hola ${nameEmployee}. Gracias por tu tiempo!!`,
    showConfirmButton: false,
    timer: 2000
  });
}

const getAlertWarning = (nameEmployee) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: `Hola ${nameEmployee}. Te falta trabajar más!!`,
    showConfirmButton: false,
    timer: 2000
  });
}