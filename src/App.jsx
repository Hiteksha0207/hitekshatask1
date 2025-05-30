import React from 'react';
import ServiceTable from './components/ServiceTable';

const App = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="font-semibold text-center mb-6 text-[#6f757a]">Salon Service List</h1>
      <ServiceTable /> 
    </div>
  );
};

export default App;
