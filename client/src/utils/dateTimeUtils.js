export const formatDate = (date) => {

const newDate = new Date(date)



/*
Wed Nov 01 2023 09:22:00 GMT+0200 (Eastern European Standard Time)
*/

const formattedDate = newDate.toLocaleDateString('en-US',{
    year:'numeric',
    month:'long',
    day:'numeric'
})

/*
this method returns a string with language-sensitive representation of the dateprotion of this date in local timezone.

*/

return formattedDate
}