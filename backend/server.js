const mysql = require('mysql2'); // Use mysql2 instead of mysql
const express = require('express');
const cors=require('cors');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
host: 'localhost',
database: 'salonapp', 
user: 'root',
password: ''
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 8081;

app.listen(port, () => {
console.log(`server:http://localhost:${port}`);
connection.connect((err) => {
if (err) throw err;
console.log('Connected to database');
});
});

// API Endpoint to handle admin registration
app.post('/register', (req, res) => {
  const { admin_fname, admin_lname, admin_email, admin_phone, admin_pwd, confirm_pwd } = req.body;
  const sql = "INSERT INTO admin (`admin_fname`, `admin_lname`, `admin_email`, `admin_phone`, `admin_pwd`, `confirm_pwd`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [admin_fname, admin_lname, admin_email, admin_phone, admin_pwd, confirm_pwd];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: 'Database error' });
    }
   // alert('Admin registered successfully');
    res.status(200).json({ message: 'Admin registered successfully'});

  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM admin WHERE `admin_email`=? AND `admin_pwd`=? ";

  connection.query(sql,[ req.body.admin_email,  req.body.admin_pwd] , (err, data) => {
    if (err) {
      console.error("Error executing query", err);
      return res.json("error");
    }
    if (data.length>0){
      return res.json ("Success")  
     }else{
      return res.json ('failed');
  }
  });
});


  

app.get('/service', (req, res) => {
const sql = 'SELECT * FROM service';
connection.query(sql, (err, result) => {
if (err) throw err;
res.send(result);
console.log('anna')
});
});

app.get('/client',(req,res)=>{
const sql='SELECT * FROM client';
connection.query(sql, (err, result) => {
if (err) throw err;
res.send(result);
console.log('anna');
});
});

app.get('/beautician',(req,res)=>{
    const sql='SELECT * FROM beautician';
    connection.query(sql, (err, result) => {
    if (err) 
      {throw err;
} else{
  res.send(result);
  console.log('beauty')
}
   
    });
    });

    /*import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import ClientsList from './clients';
import ServicesList from './services';
import BeauticiansList from './beauticians';
import { Link } from 'react-router-dom';*/