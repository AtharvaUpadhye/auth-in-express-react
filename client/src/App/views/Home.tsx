import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
export default function Home() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.token)
      history.push('/dashboard');
    else
      history.push('/login');
  }, [history]);
  return (null)
}

