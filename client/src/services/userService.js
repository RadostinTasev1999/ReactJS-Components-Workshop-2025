const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    async getAll() {
        try {
            const response = await fetch(baseUrl);
            const result = await response.json()

            const users = Object.values(result)

            return users
        } catch (error) {
            throw new Error(error)
        }

    },
    async getOne(userId) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`)

            const result = await response.json()

            console.log('Result from DB is:', result)

            return result;
            
        } catch (error) {
            throw new Error(error)
        }


    },

    async create(userData) {

        // const date = new Date();

        // const dateToIso = date.toISOString();

        const { country, city, street, streetNumber, ...postData } = userData;

        /*
        ...postData - rest operator, collects all remaining properties
                      that are not explicitly destructured into postData.
        */


        postData.address = {
            country,
            city,
            street,
            streetNumber
        }
        postData.createdAt = new Date().toISOString();
        postData.updatedAt = new Date().toISOString();

        console.log('Post Data is:', postData)

        //console.log('Post Data is:', postData)

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })

        const result = await response.json()

        return result;
    },
    
    async delete(userId){

        const response = await fetch(`${baseUrl}/${userId}`,{
            method:'DELETE'
        })

        const result = await response.json()

        return result;
    },

    async editUser(userId,userData){

        const { country, city, street, streetNumber, ...editData } = userData

        editData.address = {
            country,
            city,
            street,
            streetNumber
        }

        // postData.createdAt = new Date().toISOString();
        editData.updatedAt = new Date().toISOString();
        editData.createdAt = new Date().toISOString();

        editData._id = userId

        console.log('EditData is:', editData)
        

        const response = await fetch(`${baseUrl}/${userId}`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData)
        })

            const result = await response.json()

            return result;
    }

}