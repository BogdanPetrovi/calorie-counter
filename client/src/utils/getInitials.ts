const getInitials = (fullName: string) => {
  const splitedName = fullName.split(' ')
  if(splitedName.length > 1) {
    const initials = `${splitedName[0][0]}${splitedName[1][0]}`
    
    return initials
  } else {
    return fullName[0] || ''
  }
}

export default getInitials