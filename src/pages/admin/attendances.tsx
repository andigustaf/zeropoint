import {collection, endAt, limit, onSnapshot, orderBy, query, startAt, Timestamp, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import ListAttendance from "../../components/datatables/ListAttendance";
import HeaderPage from "../../components/headers/HeaderPage";
import {firestore} from "../../config/firebase";
import {format, setDate} from 'date-fns';
import {useDisclosure} from "@chakra-ui/react";
import DetailAttendance from "../../components/modals/DetailAttendance";

const Attendance = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [selectedData, setSelectedData] = useState(null)
    const [employees, setEmployees] = useState([])
    const [attendances, setAttendances] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 100,
        search: "",
        date: new Date()
    });
    const [oldDate, setOldDate] = useState(null);

    // Modal
    const {isOpen: detailIsOpen, onOpen: detailOnOpen, onClose: detailOnClose} = useDisclosure()

    useEffect(() => {
        if (data.length == 0) {
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
        }
    }, [pagination])

    useEffect(() => {
        if (oldDate != pagination.date) {
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

            setOldDate(pagination.date)

            return () => {
                unsubscribe()
            }
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
                    jam: ((clockOut?.timestamp - clockIn?.timestamp) / 3600).toFixed(1) + " Jam",
                    attendanceStatus,
                    clockInData: clockIn,
                    clockOutData: clockOut
                }
            })
            setData([...temp])
        }
    }, [employees, attendances])

    useEffect(() => {
        if (pagination.search != "") {
            const temp = data.filter(item => item?.displayName?.toLowerCase()?.includes(pagination.search.toLowerCase()))
            setFilteredData([...temp])
        } else {
            setFilteredData([...data])
        }
    }, [pagination, data])

    const onDetailOpen = (data) => {
        setSelectedData(data)
        detailOnOpen()
    }

    return (
        <>
            <HeaderPage
                title="Presensi"
                desc="Daftar hadir karyawan akan ditampilkan di halaman ini"
            />
            <ListAttendance
                data={filteredData}
                pagination={pagination}
                setPagination={setPagination}
                total={1}
                isLoading={false}
                onDetailOpen={onDetailOpen}
            />
            <DetailAttendance
                onOpen={detailOnOpen}
                isOpen={detailIsOpen}
                onClose={detailOnClose}
                data={selectedData}
            />
        </>
    );
};

export default Attendance;
