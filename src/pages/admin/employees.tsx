import { collection, endAt, limit, onSnapshot, orderBy, query, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListEmployee from "../../components/datatables/ListEmployee";
import HeaderPage from "../../components/headers/HeaderPage";
import { firestore } from "../../config/firebase";

const Employee = () => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
    search: "",
  });

  useEffect(() => {
    const q = query(
      collection(firestore, "users"),
      orderBy('displayName'),
      startAt(pagination.search),
      endAt(pagination.search+'\uf8ff'),
      limit(pagination.limit)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      for (const doc of snapshot.docs) {
        items.push(doc.data())
      }
      setData([...items])
    })

    return () => {
      unsubscribe()
    }
  }, [pagination])
  
  return (
    <>
      <HeaderPage
        title="Karyawan"
        desc="Daftar karyawan akan ditampilkan di halaman ini"
      />
      <ListEmployee
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        total={1}
        isLoading={false}
      />
    </>
  );
};

export default Employee;
