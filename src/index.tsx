import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { request } from 'http';

createServer({

  models: {
    transaction: Model, 
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Website development",
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-01-08 09:00:00')
        },

        {
          id: 2,
          title: "Rent",
          type: 'withdraw',
          category: 'Home',
          amount: 1000,
          createdAt: new Date('2022-28-07 11:00:00')
        },

      ],
    })
  },

  routes(){
    this.namespace = 'api'; // Calls from this address

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      
      return schema.create('transaction', data) // Schema = bd
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
