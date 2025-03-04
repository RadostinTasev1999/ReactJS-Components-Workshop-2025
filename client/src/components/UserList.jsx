import { useEffect } from "react";

import userService from "../services/userService";
import { useState } from "react";

import Pagination from "./Pagination";
import SearchUser from "./Search";
import UserListItem from "./UserListItem";
import AddUser from "./AddUser";
import UserDetails from "./UserDetails";
import DeleteUser from "./DeleteUser";
import EditUser from './EditUser'



export default function UserList(){

  const [user,setUser] = useState([])
  const [display,setDisplay] = useState(false)
  const [userIdInfo,setUserIdInfo] = useState(null); 
  const [onDeleteId, setDeleteId] = useState(null);
  const [userIdEdit, setUserIdEdit] = useState(null);
  
 

  /*
  Fetch users from DataBase:
  */

  useEffect(() => {
    userService.getAll()
      .then(result => {
       // Get all users
        setUser(result)
        //Update user state and trigger re-render of the component
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
  /*
  new FormData() - object which allows you to easily construct a set of key-value
                   pairs, representing form fileds and their values.
  event.target() - form element which has triggered the event.
  new FormData(event.target) - createsa new FormData object by taking the form element
                               which has triggered the event as its argument
                     this object contains all the input data from that form
  */
  console.log('Form is:', form)
  //! Get form data
  const userData = Object.fromEntries(form)
  /*
  Object.fromEntries() - this method transforms a list of key-value pairs 
                         into an object
  */
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

const toggleUserInfo = (_id) => {
  console.log('ID inside the toggleUserInfo is:', _id)
  setUserIdInfo(_id)
}

const closeDeletePrompt = () => {
    setDisplay(false)
}

const toggleDeletePrompt = (_id) => {
    setDeleteId(_id)
}


const onClose = () => {
  setUserIdInfo(false);
  setUserIdEdit(null);
}

const deleteUser = async(userId) => {
    // DELETE request to DB
      await userService.delete(userId)


    // Update user state
      setUser(state => state.filter(user => user._id !== userId))

     //! filter() - create a shallow copy of a portion of a given array,
     //!            filtered down to just the elements from the given array
     //!            that pass the test implemented by the provided function
    // close modal
    setDeleteId(null);
}

const toggleEditPrompt = (userId) => {
  setUserIdEdit(userId);
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

          {
            userIdInfo && (
               <UserDetails userId={userIdInfo} displayInfo={onClose}/>
          )
          }

          {
            onDeleteId && (
              <DeleteUser closePrompt={closeDeletePrompt} onDelete={deleteUser} userId={onDeleteId}/>
          )
          }

          {
            userIdEdit && (
              <EditUser closeEditForm={onClose}/>
            )
          }


          {/* <UserDetails /> */}

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
                user.map(object => 
                  <UserListItem 
                    key={object._id} 
                    {...object} 
                    toggleInfo={toggleUserInfo} 
                    toggleDelete={toggleDeletePrompt}
                    toggleEdit={toggleEditPrompt}
                    />)
              }
              {/* 
              {...object} - by this spread syntax, we pass all the properties of the object to UserListItem as individual props.

              */}
               
              </tbody>
            </table>
          </div>

          <button className="btn-add btn" onClick={addUser}>Add new user</button>

          <Pagination />
        </section>
        </>
    )
}