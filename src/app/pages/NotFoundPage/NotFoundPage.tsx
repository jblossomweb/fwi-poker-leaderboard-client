import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div style={{ textAlign: 'center'}}>
    <h1>Sorry, that URL was not found. 🙁</h1>
    <p>
      <Link to={`/home`}>Go Home</Link>
    </p>
  </div>
)
