import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../utils';

export default function Dashboard() {
  const history = useHistory()

  const [user, setuser] = useState('')

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }
  useEffect(() => {
    fetch(
      BASE_URL,
      {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }
    ).then(
      res => res.json()
    ).then(
      (result) => {
        if (result.user) {
          setuser(result.user.username);
        } else {
          localStorage.removeItem('token');
          history.push('/login');
        }
      }
    );
  }, [history])

  return (
    <div style={{ margin: "1rem" }}>
      <h1>Dashboard</h1>
      {!user && <h1 >Getting user information...</h1>}
      {user && <h1>Hello, {user}!! 👋</h1>}
      <Button color="primary" variant="contained" onClick={logout}>Logout</Button>
    </div >
  )
}
