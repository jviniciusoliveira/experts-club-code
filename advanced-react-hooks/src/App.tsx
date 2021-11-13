import './styles.css';
import { useState } from "react";
import { UserForm } from "./components/UserForm";
import { UserSection } from './components/UserSection';

export function App() {
  const [userName, setUserName] = useState('');
  const handleSubmit = (newUserName: string) => setUserName(newUserName);
  //const handleSelect = (newUserName: string) => setUserName(newUserName);

  return (
    <div className="app-container">
      <UserForm userName={userName} onSubmit={handleSubmit} />
      <UserSection userName={userName} />
    </div>
  );
}
