import React from 'react'
import qs from 'qs'
import { useState, useEffect } from 'react'
import { List } from "./list"
import { SearchPannel } from "./search-pannel"
import { cleanObject } from '../../utils/index'


export const ProjectListScreen = () => { 

  const apiUrl = process.env.REACT_APP_API_URL

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => { 
      if (response.ok) { 
        setList(await response.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => { 
      if (response.ok) { 
        setUsers(await response.json())
      }
    })
  }, [])
  return <div>
    <SearchPannel param={param} setParam={setParam} users={ users }/>
    <List list={list} users={ users }/>
  </div>
}