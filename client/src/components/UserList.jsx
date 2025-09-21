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
  const [displayUsers, setDisplayUsers] = useState([]);
  const [display,setDisplay] = useState(false)
  const [userIdInfo,setUserIdInfo] = useState(null); 
  const [onDeleteId, setDeleteId] = useState(null);
  const [userIdEdit, setUserIdEdit] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  //const [searchTerm, setSearchTerm] = useState('')
  
 

  /*
  useEffect Hook allows you to perform side effects in your components
  example: fetch data / directly update DOM / Timers
  */

  /*
  useEffect runs on every render.
  There are several ways to control when side effects run.
  
  */

  useEffect(() => {
    userService.getAll()
    // Attaches callbacks for the resolution and/or rejection of the Promise.
      .then(result => {
       // Get all users
        setUser(result)
        //Update user state and trigger re-render of the component
      })
  },[])
  // [] - Runs only on the first render

  useEffect(() => {
      setDisplayUsers(user)
      
  },[user])
  
 

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
 
   // console.log('Form in saveUserHandler is:', form)
  //! Get form data
  const userData = Object.fromEntries(form)
  console.log('User data is:', userData)
  //! Create new user on server
  const createdUser = await userService.create(userData)


  //! Update local state
  setUser(state => [...state,createdUser])

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

/*
this function will be invoked when the user clicks the Edit button in UserListItem Component
*/
const toggleEditPrompt = (userId) => {
  setUserIdEdit(userId);
}


const editUserHandler = async(event) => {

  // Stop default refresh after submit

  event.preventDefault();
  const userId = userIdEdit

  // Get Form data
  const form = new FormData(event.target)
  const userData = Object.fromEntries(form)

  console.log('userEditData is:', userData)
  // Update server
  const editUser = await userService.editUser(userId,userData)

  console.log('Editted user is:', editUser)

  // Update local state
  setUser(state => state.map(user => user._id === userId ? editUser : user))
  // Close modal
  setUserIdEdit(null);


}

const onSearch = (e) => {
  e.preventDefault()

  const data = new FormData(e.target)
  const {search, criteria} = Object.fromEntries(data)

  console.log(search, criteria)
  console.log('user state is:', user)
  //setUser((state) => state.filter((obj) => obj.criteria === search))
  if (criteria === '') {
    window.alert('Please enter Search Criteria!')
    return;
  }
  const searchResult = user.filter((el) => el[criteria] === search) 
    // the name of the property is determined by the value of the variable criteria
  console.log('searchResult', searchResult)
  setDisplayUsers(searchResult)

  // const displayedItems = user.filter((item) => {
  //   return item.inlcudes(searchTerm)
  // })
  // setUser(displayedItems)
}

const clearSearch = () => {
 setSearchValue('')
 setDisplayUsers(user)
}

const handleChange = (e) => {
  // console.log('Event target value is:', e.target.value)
  setSearchValue(e.target.value)
}

    return (
        <>
        <section className="card users-container">  
          
          <SearchUser
            onSearch={onSearch}
            onClear={clearSearch}
            inputChangeHandler={handleChange}
            searchValue={searchValue}
            //searchTerm={searchTerm}
            />  

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
              <EditUser 
                closeEditForm={onClose}
                user = {user.find(user => user._id === userIdEdit)}
                editUser={editUserHandler}
                />
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
                displayUsers.map(object => 
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