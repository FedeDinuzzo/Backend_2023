"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        login()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const login = () => {
    console.log('processing')

    const user = {
      email: email,
      password: password
    };

    fetch('http://localhost:4000/api/session/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.text())
      .then(data => {
        if (data.user) {
          router.push('/products')
        } else {
          alert('incorrect data')
        }
      })
      // .catch(error => {
      //   console.log(error)
      // })
  }

  return (
    <>
      <h2 className="title">Login</h2>
      <div className="logContainer">
        <div className="prodCard cardLogin">
          <div className="logEmail">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="logPass">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn" onClick={login}>Login</button>

          <div className="log">Or log in to your account</div>
          <a href="/authSession/github">
            <div className="link1">GitHub</div>
          </a>
          <div className="link2"><a href="/register">Create Account</a></div>
        </div>
      </div>
    </>
  )
}

export default Login