import { useState } from 'react';

const AuthButtons = () => (
  <>
    <button>Login</button>
    <button>Register</button>
  </>
);

const UserButtons = () => (
  <>
    <button>Listing</button>
    <button>Dashboard</button>
    <button>Logout</button>
  </>
);

export default function Header() {
  const [isLoggedIn] = useState(false); // change later

  return (
    <header>
      <div>Site Title</div>
      <nav>{isLoggedIn ? <UserButtons /> : <AuthButtons />}</nav>
    </header>
  );
};