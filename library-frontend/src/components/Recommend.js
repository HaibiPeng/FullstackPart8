import React from 'react'
import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
  const me = useQuery(ME)

  let favoritegenre = ''
    if (!(me.data === undefined || me.data.me === null)) {     
    favoritegenre = me.data.me.favoriteGenre
  }

  const result = useQuery(ALL_BOOKS, { 
    skip: !{ genre: favoritegenre },
    variables: { genre: favoritegenre }
  })
      
  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  //let books = result.data.allBooks.filter(b => b.genres.includes(genre))
  let books = (result.data === undefined) ? [] : result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <span>books in your favourite genre : <strong>{favoritegenre}</strong></span>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(", ") }</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
