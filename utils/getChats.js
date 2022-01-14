const getChats = (users, loggedInUser) => {
    return users?.filter((userToFilter) => userToFilter !== loggedInUser)[0]
}

export default getChats
