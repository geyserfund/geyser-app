import { createContext, useContext, useState } from 'react'

export type NavContextData = {
  projectName: string
  projectTitle: string
  projectPath: string
  projectOwnerIDs: number[]
}

type NavContextProps = {
  navData: NavContextData
  setNavData: React.Dispatch<React.SetStateAction<NavContextData>>
}

const defaultNavData = {
  projectName: '',
  projectTitle: '',
  projectPath: '',
  projectOwnerIDs: [],
}

const defaultNavContext = {
  navData: defaultNavData,
  setNavData() {},
}

export const NavContext = createContext<NavContextProps>(defaultNavContext)

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [navData, setNavData] = useState<NavContextData>(defaultNavData)

  return (
    <NavContext.Provider
      value={{
        navData,
        setNavData,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export const useNavContext = () => useContext(NavContext)
