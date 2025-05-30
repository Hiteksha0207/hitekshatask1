import React from 'react';
import ServiceTable from './components/ServiceTable';

const App = () => {
  return (
    <div className="min-h-screen p-4">
      <p className="font-semibold text-[20px] text-center mb-6 text-[#6f757a]">Salon Service List</p>
      <ServiceTable /> 
    </div>
  );
};

export default App;
