
const appid = process.env.APPID;
import express, { Application } from 'express';
import http from 'http';
import fs from 'fs';
import router from './routes';
import mongoose from 'mongoose';
//import { APP_PORT, MONGO_URI, MONGO_OPTIONS } from './config';
import consola from 'consola';
let prerender = require('prerender-node');
// import spdy from 'spdy';
import path from 'path';


const app = express();



const port = 5000 ;




app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);



  mongoose.connect("mongodb+srv://farhandb:farhandb1@cluster0.0okjq.mongodb.net/farhan").then(()=>{
    app.listen(port, () => {
      console.log(`Server running on port ${port}\n`);
    });

  }).catch(err=>{

  })
 
 
    // spdy.createServer(options, app)
   
  
