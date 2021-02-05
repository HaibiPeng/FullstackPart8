import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import { ALL_AUTHORS } from '../queries'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const authorresult = useQuery(ALL_AUTHORS)
  const authors = authorresult.data.allAuthors
  const Authors = authors.map(A => A)

  const [ changeBorn, editresult ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  const submit = (event) => {
    event.preventDefault()
    console.log(name)
    changeBorn({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (editresult.data && editresult.data.editAuthor === null) {
      console.log('author not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editresult])

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
              <option value="DEFAULT" >Choose an author</option>
              {Authors.map((a, key) => 
              <option key={key} value={a.name}>{a.name}</option>
              )}
          </select>
        </label>
        <div>
          born <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setBorn(Number(target.value)) }
            required
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm