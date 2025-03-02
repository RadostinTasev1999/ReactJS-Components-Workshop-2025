import { useEffect } from "react";

import userService from "../services/userService";
import { useState } from "react";

import Pagination from "./Pagination";
import SearchUser from "./Search";
import UserListItem from "./UserListItem";
import AddUser from "./AddUser";


export default function UserList(){

  const [user,setUser] = useState([])
  const [display,setDisplay] = useState(false)

  /*
  Fetch users from DB:
  */

  useEffect(() => {
    userService.getAll()
      .then(result => {
        console.log('Result from fetching DB is:', result)
        setUser(result)
      })
  },[])
  
  const addUser = () => {
    setDisplay(true)
  }


const closeUserForm = () => {
   setDisplay(false)
}

const saveUserHandler = async (event) => {
  //! Stop default refresh
  event.preventDefault()

  //console.log('Form data is:', new FormData(event.target))
  const form = new FormData(event.target)
  console.log('Form is:', form)
  //! Get form data
  const userData = Object.fromEntries(form)
console.log('Object from entries are:', userData)
  console.log('User data is:', userData)
  //! Create new user on server
  const createdUser = await userService.create(userData)

  console.log('Created   user is:',createdUser)
  //! Update local state
  setUser(state => [...state,createdUser])
/*
We create a new array by copying elements from the state array and adding
createdUser to the end of it
*/
  //! Close modal
  setDisplay(false)
}
    return (
        <>
        <section className="card users-container">
          
          <SearchUser />  

          {
            display && (
              <AddUser 
                  closeForm={closeUserForm} 
                  saveForm={saveUserHandler}
                  />
            )
          }

          <div className="table-wrapper">

            <table className="table">
              <thead>
                <tr>
                  <th>
                    Image
                  </th>
                  <th>
                    First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                      </path>
                    </svg>
                  </th>
                  <th>
                    Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                      className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                      </path>
                    </svg>
                  </th>
                  <th>
                    Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                      className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                      </path>
                    </svg>
                  </th>
                  <th>
                    Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                      className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                      </path>
                    </svg>
                  </th>
                  <th>
                    Created
                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                      </path>
                    </svg>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              
              {
                user.map(object => <UserListItem key={object._id} {...object}/>)
              }
               
              </tbody>
            </table>
          </div>

          <button className="btn-add btn" onClick={addUser}>Add new user</button>

          <Pagination />
        </section>
        </>
    )
}