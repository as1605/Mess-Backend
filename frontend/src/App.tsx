import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Admin } from './utils/types';
import { AuthContext } from './utils/auth';

function App() {
  const [user, setUser] = useState<Admin | null>(null);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
      </AuthContext.Provider>
    </>
  );
}

export default App;
