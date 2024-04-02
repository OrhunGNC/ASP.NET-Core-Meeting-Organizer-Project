import React, { useEffect } from 'react';
import axios from 'axios';

const names = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Michael", lastName: "Smith" },
    { firstName: "David", lastName: "Johnson" },
    { firstName: "James", lastName: "Brown" },
    { firstName: "Robert", lastName: "Williams" },
    { firstName: "Daniel", lastName: "Jones" },
    { firstName: "Christopher", lastName: "Garcia" },
    { firstName: "Matthew", lastName: "Martinez" },
    { firstName: "Andrew", lastName: "Hernandez" },
    { firstName: "Joseph", lastName: "Young" }
];

const titles = ["Software Developer", "Project Manager", "Marketing Specialist", "Data Analyst", "HR Manager", "Financial Analyst", "Graphic Designer", "Sales Representative", "Operations Manager", "Customer Support Specialist"];

function getRandomSalary() {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
}

function createPerson() {
    const name = names[Math.floor(Math.random() * names.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const salary = getRandomSalary();
    return {
        personelName: `${name.firstName} ${name.lastName}`,
        personelTitle: title,
        personelSalary: salary,
    };
}
function Create(){
    for (let i = 0; i < 10; i++) {
        const newPerson = createPerson();
        axios
            .post(`https://localhost:7018/api/Personel`, newPerson)
            .then((response) => {
                console.log("Başarıyla Gerçekleşti", response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function App() {

        

    return (
        <div style={{width:'100%',textAlign:'center'}}>
<button style={{backgroundColor:'green',border:'none',color:'white',borderRadius:'15px'}} onClick={()=>Create()}><h3>Click to fill personel table</h3></button>
<p>Otherwise you won't be able to organize a meeting</p>
        </div>
        
    );
}

export default App;
