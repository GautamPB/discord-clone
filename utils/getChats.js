const getChats = (users, loggedInUser) => {
    users?.filter((userToFilter) => userToFilter !== loggedInUser?.email)[0]
}

export default getChats()
