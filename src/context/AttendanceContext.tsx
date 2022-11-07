import { createContext, useContext, useState } from "react";

export const AttendanceContext = createContext<any>({})

export const useAttendance = () => useContext(AttendanceContext)

export const  AttendanceContextProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const [attendance, setAttendance] = useState({
        type: 'CLOCK_IN',
        imageUrl: '',
        note: '',
        base64Image: '',
    })

    return (
        <AttendanceContext.Provider value={{ attendance, setAttendance }}>
          {children}
        </AttendanceContext.Provider>
      )
};