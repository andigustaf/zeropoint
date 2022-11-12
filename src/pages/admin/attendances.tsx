import { collection, endAt, limit, onSnapshot, orderBy, query, startAt, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListAttendance from "../../components/datatables/ListAttendance";
import HeaderPage from "../../components/headers/HeaderPage";
import { firestore } from "../../config/firebase";
import { format, setDate } from 'date-fns';

const Attendance = () => {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [attendances, setAttendances] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
    search: "",
    date: new Date()
  });

  useEffect(() => {
    const q = query(
      collection(firestore, "users"),
      orderBy('displayName'),
      limit(pagination.limit)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      for (const doc of snapshot.docs) {
        items.push(doc.data())
      }
      setEmployees([...items])
    })

    return () => {
      unsubscribe()
    }
  }, [pagination])

  useEffect(() => {
    const startOfDay = new Date(pagination.date.getFullYear(), pagination.date.getMonth(), pagination.date.getDate(), 0, 0, 0)
    const endOfDay = new Date(pagination.date.getFullYear(), pagination.date.getMonth(), pagination.date.getDate(), 23, 59, 59)

    const q = query(
      collection(firestore, "checklogs"),
      where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
      where('timestamp', '<=', Timestamp.fromDate(endOfDay)),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      for (const doc of snapshot.docs) {
        items.push(doc.data())
      }
      setAttendances([...items])
    })

    return () => {
      unsubscribe()
    }
  }, [pagination])

  useEffect(() => {
    if (employees.length > 0) {
      const temp = employees.map(item => {
        const clockIn = attendances.find(x => x.email == item.email && x.type == "CLOCK_IN")
        const clockOut = attendances.find(x => x.email == item.email && x.type == "CLOCK_OUT")
        const attendanceStatus = clockIn?.is_wfo || clockOut?.is_wfo 
          ? 'WFO' 
          : clockIn !== undefined || clockIn !== undefined 
            ? 'WFH' 
            : '-'
        return {
          ...item,
          clockIn: clockIn?.timestamp && format(clockIn?.timestamp?.toDate(), 'HH:mm'),
          clockOut: clockOut?.timestamp && format(clockOut?.timestamp?.toDate(), 'HH:mm'),
          attendanceStatus
        }
      })
      setData([...temp])
    }
  }, [employees, attendances])
  
  return (
    <>
      <HeaderPage
        title="Presensi"
        desc="Daftar hadir karyawan akan ditampilkan di halaman ini"
      />
      <ListAttendance
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        total={1}
        isLoading={false}
      />
    </>
  );
};

export default Attendance;
