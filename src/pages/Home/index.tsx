import React from 'react'

function Home () {
  const userNameLocal = localStorage.getItem('name')

  function deslogar (props) {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
  }

  return (
    <form>
      <h1>Home Page</h1>
      <p>{userNameLocal}</p>
      <button
        onClick={deslogar}
      >Sair</button>
    </form>
  )
}

export default Home
